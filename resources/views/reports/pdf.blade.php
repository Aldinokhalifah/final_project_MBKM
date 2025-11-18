<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            padding: 40px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #2c3e50;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .header p {
            color: #7f8c8d;
            font-size: 14px;
        }
        .info-section {
            margin-bottom: 30px;
            background: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #2c3e50;
        }
        .info-value {
            color: #34495e;
        }
        .summary-section {
            margin: 30px 0;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
        .summary-card {
            background: #fff;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-bottom: 10px;
        }
        .summary-card.income {
            border-color: #27ae60;
        }
        .summary-card.expense {
            border-color: #e74c3c;
        }
        .summary-card.profit {
            border-color: #3498db;
        }
        .summary-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        .summary-amount {
            font-size: 24px;
            font-weight: bold;
        }
        .summary-amount.income {
            color: #27ae60;
        }
        .summary-amount.expense {
            color: #e74c3c;
        }
        .summary-amount.profit {
            color: #3498db;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #95a5a6;
            font-size: 12px;
            border-top: 1px solid #bdc3c7;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $title }}</h1>
        <p>Generated on {{ $date }}</p>
    </div>

    <div class="info-section">
        <div class="info-row">
            <span class="info-label">Report ID:</span>
            <span class="info-value">#{{ $report->report_id }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Outlet:</span>
            <span class="info-value">{{ $report->outlet->name }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Owner:</span>
            <span class="info-value">{{ $report->user->name }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Period:</span>
            <span class="info-value">{{ ucfirst($report->period) }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Date Range:</span>
            <span class="info-value">{{ \Carbon\Carbon::parse($report->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($report->end_date)->format('d M Y') }}</span>
        </div>
    </div>

    <div class="summary-section">
        <h2 style="margin-bottom: 20px; color: #2c3e50;">Financial Summary</h2>
        <div class="summary-grid">
            <div class="summary-card income">
                <div class="summary-label">Total Income</div>
                <div class="summary-amount income">Rp {{ number_format($report->total_income, 0, ',', '.') }}</div>
            </div>
            <div class="summary-card expense">
                <div class="summary-label">Total Expense</div>
                <div class="summary-amount expense">Rp {{ number_format($report->total_expense, 0, ',', '.') }}</div>
            </div>
            <div class="summary-card profit">
                <div class="summary-label">Net Profit</div>
                <div class="summary-amount profit">Rp {{ number_format($report->profit, 0, ',', '.') }}</div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This is a computer-generated document. No signature is required.</p>
        <p>© {{ now()->year }} Kasku - Financial Management System</p>
    </div>
</body>
</html>