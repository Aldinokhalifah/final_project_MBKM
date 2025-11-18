<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reports;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        Reports::create([
            'owner_id' => 1,
            'outlet_id' => 1,
            'period' => 'monthly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
            'total_income' => 500000,
            'total_expense' => 150000,
            'generated_at' => now()
        ]);
    }
}
