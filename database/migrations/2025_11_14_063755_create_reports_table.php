<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id('report_id');

            $table->foreignId('outlet_id')
                ->constrained('outlets', 'outlet_id')
                ->onDelete('cascade');

            $table->enum('period', ['daily', 'weekly', 'monthly']);
            $table->date('start_date');
            $table->date('end_date');

            $table->decimal('total_income', 15, 2)->default(0);
            $table->decimal('total_expense', 15, 2)->default(0);

            // profit = income - expense
            $table->decimal('profit', 15, 2)->storedAs('total_income - total_expense');

            $table->timestamp('generated_at')->useCurrent();

            $table->timestamps();

            $table->index(['outlet_id', 'period']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
