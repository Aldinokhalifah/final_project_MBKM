<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use App\Models\Transactions;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->user_id;

        $reports = Reports::with('user', 'outlet')
            ->where('owner_id', $userId)
            ->orderBy('generated_at', 'desc')
            ->get();


        if ($reports->isEmpty()) {
            return response()->json([
                'message' => 'reports not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get all reports',
            'data' => $reports
        ], 200);
    }

    public function store(Request $request)
    {
        $userId = $request->user()->user_id;

        // VALIDASI: total_income & total_expense TIDAK PERLU dari frontend
        $validated = $request->validate([
            'outlet_id'  => 'required|exists:outlets,outlet_id',
            'period'     => 'required|in:daily,weekly,monthly',
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',
        ]);

        // AMBIL TRANSAKSI SESUAI FILTER
        $transactions = Transactions::where('user_id', $userId)
            ->where('outlet_id', $validated['outlet_id'])
            ->whereBetween('date', [$validated['start_date'], $validated['end_date']])
            ->get();

        // HITUNG TOTAL PEMASUKAN & PENGELUARAN
        $totalIncome = $transactions
            ->where('type', 'income')
            ->sum('amount');

        $totalExpense = $transactions
            ->where('type', 'expense')
            ->sum('amount');

        // SIMPAN REPORT
        $report = Reports::create([
            'owner_id'      => $userId,
            'outlet_id'     => $validated['outlet_id'],
            'period'        => $validated['period'],
            'start_date'    => $validated['start_date'],
            'end_date'      => $validated['end_date'],
            'total_income'  => $totalIncome,
            'total_expense' => $totalExpense,
        ]);

        // Biar langsung ada relasi di response
        $report->load(['user', 'outlet']);

        return response()->json([
            'message' => 'report created successfully',
            'data'    => $report,
        ], 201);
    }
    public function show(Request $request, $id)
    {
        $userId = $request->user()->user_id;

        $report = Reports::with(['user', 'outlet'])
            ->where('report_id', $id)
            ->where('owner_id', $userId)
            ->first();

        if (!$report) {
            return response()->json([
                'message' => 'report not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get report detail',
            'data' => $report
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->user_id;

        $report = Reports::with(['user', 'outlet'])
            ->where('report_id', $id)
            ->where('owner_id', $userId)
            ->first();

        if (!$report) {
            return response()->json([
                'message' => 'report not found',
                'data' => []
            ], 404);
        }

        $report->delete();

        return response()->json([
            'message' => "report ID: $id deleted successfully"
        ], 200);
    }

    public function exportPdf(Request $request, $id)
    {
        $userId = $request->user()->user_id;

        $report = Reports::with(['user', 'outlet'])
            ->where('report_id', $id)
            ->where('owner_id', $userId)
            ->first();

        if (!$report) {
            return response()->json([
                'message' => 'Report not found',
                'data' => []
            ], 404);
        }


        // Data untuk PDF
        $data = [
            'report' => $report,
            'title' => ucwords($report->outlet->name) . " Financial Report",
            'date' => now()->format('d F Y')
        ];

        // Generate PDF
        $pdf = Pdf::loadView('reports.pdf', $data)
            ->setPaper('a4', 'portrait');

        // Download PDF dengan nama file dinamis
        $filename = 'report-' . $report->outlet->outlet_name . '-' . $report->period . '-' . now()->format('Ymd') . '.pdf';

        return $pdf->download($filename);
    }

    public function exportAllPdf(Request $request)
    {
        $userId = $request->user()->user_id;

        // Optional filters
        $query = Reports::with(['user', 'outlet'])
            ->where('owner_id', $userId);

        // Filter berdasarkan outlet jika dimasukkan
        if ($request->has('outlet_id')) {
            $query->where('outlet_id', $request->outlet_id);
        }

        // Filter berdasarkan period jika dimasukkan
        if ($request->has('period')) {
            $query->where('period', $request->period);
        }

        // Filter berdasarkan date range jika dimasukkan
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('start_date', [$request->start_date, $request->end_date]);
        }

        $reports = $query->orderBy('start_date', 'desc')->get();

        if ($reports->isEmpty()) {
            return response()->json([
                'message' => 'No reports found',
                'data' => []
            ], 404);
        }

        // Calculate totals
        $totalIncome = $reports->sum('total_income');
        $totalExpense = $reports->sum('total_expense');
        $totalProfit = $totalIncome - $totalExpense;

        $data = [
            'reports' => $reports,
            'title' => 'All Financial Reports',
            'date' => now()->format('d F Y'),
            'total_reports' => $reports->count(),
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'total_profit' => $totalProfit
        ];

        $pdf = Pdf::loadView('reports.all-pdf', $data)
            ->setPaper('a4', 'portrait');

        $filename = 'all-reports-' . now()->format('Ymd-His') . '.pdf';

        return $pdf->download($filename);
    }
}
