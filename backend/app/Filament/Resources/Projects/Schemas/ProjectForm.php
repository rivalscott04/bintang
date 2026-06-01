<?php

declare(strict_types=1);

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectStatus;
use App\Models\Cluster;
use App\Models\Project;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi utama')
                    ->description('Data dasar yang tampil di kartu dan halaman proyek.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama proyek')
                            ->placeholder('Contoh: Cluster Marocco Townhouses')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->lazy()
                            ->afterStateUpdated(function (Set $set, Get $get, ?string $state): void {
                                if (blank($get('slug'))) {
                                    $set('slug', Str::slug($state ?? ''));
                                }
                            }),
                        Select::make('cluster_id')
                            ->label('Klaster')
                            ->relationship('clusterRecord', 'title')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->lazy()
                            ->afterStateUpdated(function (Set $set, ?int $state): void {
                                if ($state === null) {
                                    return;
                                }

                                $cluster = Cluster::query()->find($state);
                                if ($cluster !== null) {
                                    $set('cluster', $cluster->name);
                                }
                            }),
                        TextInput::make('cluster')
                            ->dehydrated()
                            ->hidden(),
                        TextInput::make('cluster_type')
                            ->label('Jenis klaster')
                            ->placeholder('Residential / Commercial')
                            ->required()
                            ->maxLength(255),
                        Select::make('status')
                            ->label('Status proyek')
                            ->options(ProjectStatus::class)
                            ->required()
                            ->native(false),
                        TextInput::make('phase')
                            ->label('Fase / tahap')
                            ->placeholder('Tahap 1: Ready Stock Terbatas')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        TextInput::make('price_range')
                            ->label('Kisaran harga')
                            ->placeholder('Mulai Rp 1.8 Miliar')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),
                Section::make('Foto & ringkasan')
                    ->description('Gambar utama dan teks singkat untuk daftar proyek.')
                    ->schema([
                        Placeholder::make('legacy_image_notice')
                            ->label('Gambar saat ini')
                            ->content(function (?Project $record): HtmlString|string {
                                if (! $record?->usesLegacyImagePath()) {
                                    return '';
                                }

                                $src = e($record->image);
                                $alt = e($record->image_alt);

                                return new HtmlString(
                                    '<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">'
                                    .'Proyek ini masih memakai gambar dari folder statis. Upload foto baru di bawah untuk menggantinya.'
                                    .'</p>'
                                    .'<img src="'.$src.'" alt="'.$alt.'" class="max-h-48 rounded-lg border border-gray-200 dark:border-gray-700 object-cover" />'
                                );
                            })
                            ->visible(fn (?Project $record): bool => $record?->usesLegacyImagePath() ?? false)
                            ->columnSpanFull(),
                        FileUpload::make('image')
                            ->label('Foto proyek')
                            ->helperText('Seret file ke sini atau klik untuk pilih. JPG, PNG, WebP, maks. 5 MB.')
                            ->image()
                            ->disk('public')
                            ->directory('projects')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->imageEditor()
                            ->required(fn (?Project $record): bool => $record === null)
                            ->mutateDehydratedStateUsing(function (mixed $state, ?Project $record): ?string {
                                if (filled($state)) {
                                    return is_array($state) ? (string) reset($state) : (string) $state;
                                }

                                return $record?->image;
                            })
                            ->columnSpanFull(),
                        TextInput::make('image_alt')
                            ->label('Deskripsi gambar (alt text)')
                            ->helperText('Deskripsi foto untuk aksesibilitas dan SEO. Contoh: Cluster Marocco Townhouses.')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        TagsInput::make('gallery')
                            ->label('Galeri foto (path atau upload)')
                            ->helperText('Path gambar tambahan untuk halaman detail. Kosongkan untuk memakai foto utama saja.')
                            ->placeholder('/assets/cluster_marocco.webp')
                            ->columnSpanFull(),
                        Textarea::make('excerpt')
                            ->label('Hook pemasaran / ringkasan')
                            ->helperText('Tampil di kartu proyek dan sub-headline halaman detail.')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),
                    ]),
                Section::make('Konten detail')
                    ->description('Isi lengkap halaman detail proyek.')
                    ->schema([
                        Textarea::make('description')
                            ->label('Deskripsi lengkap')
                            ->rows(6)
                            ->required()
                            ->columnSpanFull(),
                        TagsInput::make('highlights')
                            ->label('Poin sorotan')
                            ->helperText('Ketik satu poin, tekan Enter, lalu lanjut ke poin berikutnya.')
                            ->placeholder('Contoh: 3+1 kamar tidur')
                            ->columnSpanFull(),
                        KeyValue::make('specifications')
                            ->label('Spesifikasi teknis & konstruksi')
                            ->helperText('Contoh kunci: Pondasi, Struktur, Listrik. Tampil sebagai grid di halaman detail.')
                            ->keyLabel('Komponen')
                            ->valueLabel('Detail')
                            ->columnSpanFull(),
                    ]),
                Section::make('Tampilan di website')
                    ->description('Atur visibilitas di beranda dan halaman /projek. Urutan daftar diatur dengan seret di halaman daftar proyek.')
                    ->columns(2)
                    ->schema([
                        Toggle::make('featured')
                            ->label('Tampil di preview beranda')
                            ->helperText('Hanya proyek unggulan yang muncul di carousel/section beranda.'),
                        Toggle::make('is_published')
                            ->label('Publikasikan di website')
                            ->helperText('Nonaktifkan untuk menyembunyikan proyek tanpa menghapus data.')
                            ->default(true),
                    ]),
                Section::make('Pengaturan lanjutan')
                    ->description('Biasanya tidak perlu diubah. Buka hanya jika tim IT meminta penyesuaian teknis.')
                    ->collapsed()
                    ->schema([
                        TextInput::make('slug')
                            ->label('Alamat halaman (slug)')
                            ->helperText('Otomatis dari nama proyek. Contoh URL: /projek/marocco')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->columnSpanFull(),
                        TextInput::make('cluster_anchor')
                            ->label('Anchor ke section beranda')
                            ->placeholder('/klaster')
                            ->helperText('Opsional. Contoh /klaster atau /klaster/marocco jika belum punya relasi klaster.')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
