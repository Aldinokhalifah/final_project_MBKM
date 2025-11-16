<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TransactionController extends Controller
{
    public function index(Request $request) {
        $userId = $request->user()->user_id;

        $transactions = Transactions::with(['user', 'outlet', 'category'])
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->get();

        if($transactions->isEmpty()) {
            return response()->json([
                'message' => 'transactions not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get all transaactions',
            'data' => $transactions
        ], 200);
    }

    public function store(Request $request) {
        $userId = $request->user()->user_id;

        $validated = $request->validate([
            'outlet_id' => 'required|exists:outlets,outlet_id',
            'category_id' => 'required|exists:categories,category_id',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'attachment' => 'nullable|file|mimes:jpeg,jpg,png|max:2048'
        ]);

        // Handle file upload
        if ($request->hasFile('attachment')) {
            $validated['attachment'] = $request->file('attachment')
                ->store('attachments', 'public');
        }

        // Tambahkan user_id
        $validated['user_id'] = $userId;

        // Hapus file object dari validated jika tidak ter-upload
        if (isset($validated['attachment']) && is_object($validated['attachment'])) {
            unset($validated['attachment']);
        }

        // Create transaction
        $transaction = Transactions::create($validated);
        $transaction->load(['user', 'outlet', 'category']);

        return response()->json([
            'message' => 'Transaction created successfully',
            'data' => $transaction
        ], 201);
    }

    public function show(Request $request, $id) {
        $userId = $request->user()->user_id;

        $transaction = Transactions::with(['user', 'outlet', 'category'])
            ->where('transaction_id', $id)
            ->where('user_id', $userId)
            ->first();

        if(!$transaction) {
            return response()->json([
                'message' => 'transaction not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get detail transaction',
            'data' => $transaction
        ], 200);
    }

    public function update(Request $request, $id) {
        $userId = $request->user()->user_id;

        $transaction = Transactions::where('transaction_id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$transaction) {
            return response()->json([
                'message' => 'transaction not found '
            ], 404);
        }

        // Validasi request
        $validated = $request->validate([
            'outlet_id' => 'sometimes|required|exists:outlets,outlet_id',
            'category_id' => 'sometimes|required|exists:categories,category_id',
            'type' => 'sometimes|required|in:income,expense',
            'amount' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'attachment' => 'nullable|file|mimes:jpeg,jpg,png|max:2048'
        ]);

        if (!$request->has('description')) {
            // Jika field description tidak dikirim sama sekali, jangan update
            unset($validated['description']);
        } elseif ($request->description === null || $request->description === '') {
            // Jika dikirim tapi kosong/null, gunakan nilai lama
            $validated['description'] = $transaction->description;
        }

        // Handle file upload jika ada file baru
        if ($request->hasFile('attachment')) {
            // Hapus file lama jika ada
            if ($transaction->attachment && Storage::disk('public')->exists($transaction->attachment)) {
                Storage::disk('public')->delete($transaction->attachment);
            }

            // Upload file baru
            $validated['attachment'] = $request->file('attachment')
                ->store('attachments', 'public');
        } else {
            $validated['attachment'] = $transaction->attachment;
        }

        // Update transaction
        $transaction->update($validated);

        // Load relasi untuk response
        $transaction->load(['user', 'outlet', 'category']);

        return response()->json([
            'message' => 'Transaction updated successfully',
            'data' => $transaction
        ], 200);
    }

    public function destroy(Request $request, $id) {
        $userId = $request->user()->user_id;

        $transaction = Transactions::with(['user', 'outlet', 'category'])
            ->where('transaction_id', $id)
            ->where('user_id', $userId)
            ->first();

        if(!$transaction) {
            return response()->json([
                'message' => 'transaction not found',
                'data' => []
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'message' => "transaction id: $id deleted"
        ], 200);
    }
}
