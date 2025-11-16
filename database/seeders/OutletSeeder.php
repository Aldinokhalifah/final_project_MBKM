<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Outlets;

class OutletSeeder extends Seeder
{
    public function run(): void
    {
        Outlets::create([
            'owner_id' => 1,
            'name' => 'Outlet Pusat',
            'address' => 'Jl. Raya No. 1'
        ]);

        Outlets::create([
            'owner_id' => 1,
            'name' => 'Outlet Cabang',
            'address' => 'Jl. Sudirman No. 2'
        ]);
    }
}
