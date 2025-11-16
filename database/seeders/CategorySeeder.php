<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Categories::create([
            'owner_id' => 1,
            'name' => 'Penjualan Produk',
            'type' => 'income'
        ]);

        Categories::create([
            'owner_id' => 1,
            'name' => 'Operasional',
            'type' => 'expense'
        ]);
    }
}
