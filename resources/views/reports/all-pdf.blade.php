<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            padding: 30px;
            color: #333;
            font-size: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 8px;
        }
        .header p {
            color: #7f8c8d;
            font-size: 13px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        thead {
            background: #34495e;
            color: white;
        }
        th {
            padding: 12px 8px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
        }
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #ecf0f1;
        }
        tbody tr:hover {
            background: #f8f9fa;
        }
        tbody tr:nth-child(even) {
            background: #fafafa;
        }
        .badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
        }
        .badge.daily {
            background: #3498db;
            color: white;
        }
        .badge.weekly {
            background: #e67e22;
            color: white;
        }
        .badge.monthly {
            background: #9b59b6;
            color: white;
        }
        .amount-positive {
            color: #27ae60;
            font-weight: bold;
        }
        .amount-negative {
            color: #e74c3c;
            font-weight: bold;
        }
        .grand-summary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin-top: 20px;
            margin-bottom: 30px;
        }
        .grand-summary h2 {
            margin-bottom: 20px;
            font-size: 18px;
            text-align: center;
            border-bottom: 2px solid rgba(255,255,255,0.3);
            padding-bottom: 15px;
        }
        .grand-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }
        .grand-item {
            text-align: center;
            background: rgba(255,255,255,0.2);
            padding: 15px;
            border-radius: 8px;
        }
        .grand-label {
            font-size: 11px;
            margin-bottom: 8px;
            opacity: 0.9;
            text-transform: uppercase;
        }
        .grand-value {
            font-size: 18px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #95a5a6;
            border-top: 1px solid #bdc3c7;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $title }}</h1>
        <p>Generated on {{ $date }} | Total Reports: {{ $total_reports }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Report ID</th>
                <th>Outlet</th>
                <th>Period</th>
                <th>Date Range</th>
                <th style="text-align: right;">Income</th>
                <th style="text-align: right;">Expense</th>
                <th style="text-align: right;">Profit</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reports as $report)
            <tr>
                <td>#{{ $report->report_id }}</td>
                <td>{{ $report->outlet->name }}</td>
                <td><span class="badge {{ $report->period }}">{{ ucfirst($report->period) }}</span></td>
                <td>{{ \Carbon\Carbon::parse($report->start_date)->format('d/m/Y') }} - {{ \Carbon\Carbon::parse($report->end_date)->format('d/m/Y') }}</td>
                <td style="text-align: right;" class="amount-positive">Rp {{ number_format($report->total_income, 0, ',', '.') }}</td>
                <td style="text-align: right;" class="amount-negative">Rp {{ number_format($report->total_expense, 0, ',', '.') }}</td>
                <td style="text-align: right;" class="{{ $report->profit >= 0 ? 'amount-positive' : 'amount-negative' }}">
                    Rp {{ number_format($report->profit, 0, ',', '.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="grand-summary">
        <h2>Grand Total Summary</h2>
        <div class="grand-grid">
            <div class="grand-item">
                <div class="grand-label">Total Reports</div>
                <div class="grand-value">{{ $total_reports }}</div>
            </div>
            <div class="grand-item">
                <div class="grand-label">Total Income</div>
                <div class="grand-value">Rp {{ number_format($total_income, 0, ',', '.') }}</div>
            </div>
            <div class="grand-item">
                <div class="grand-label">Total Expense</div>
                <div class="grand-value">Rp {{ number_format($total_expense, 0, ',', '.') }}</div>
            </div>
            <div class="grand-item">
                <div class="grand-label">Net Profit</div>
                <div class="grand-value">Rp {{ number_format($total_profit, 0, ',', '.') }}</div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This is a computer-generated document. No signature is required.</p>
        <p>© {{ now()->year }} Kasku - Financial Management System</p>
    </div>
</body>
</html>