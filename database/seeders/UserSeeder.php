<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Pemilik Utama',
            'email' => 'owner@kasku.test',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@kasku.test',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);
    }
}
