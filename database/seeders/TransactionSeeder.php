<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transactions;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        Transactions::create([
            'outlet_id' => 1,
            'user_id' => 1,
            'category_id' => 1,
            'type' => 'income',
            'amount' => 500000,
            'description' => 'Penjualan harian',
            'attachment' => null,
            'date' => now()
        ]);

        Transactions::create([
            'outlet_id' => 1,
            'user_id' => 1,
            'category_id' => 2,
            'type' => 'expense',
            'amount' => 150000,
            'description' => 'Beli bahan bakar',
            'attachment' => null,
            'date' => now()
        ]);
    }
}
