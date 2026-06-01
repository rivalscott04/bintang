<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters\Schemas;

use App\Filament\Forms\Components\FontAwesomeIconPicker;
use App\Filament\Forms\Components\SitePlanBlockEditor;
use App\Models\Cluster;
use App\Support\PriceLabelHelper;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class ClusterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi klaster')
                    ->description('Tampil di kartu beranda dan halaman /klaster/{slug}.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul tampilan')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->lazy()
                            ->afterStateUpdated(function (Set $set, Get $get, ?string $state): void {
                                if (blank($get('slug'))) {
                                    $set('slug', Str::slug($state ?? ''));
                                }
                                if (blank($get('name'))) {
                                    $set('name', Str::before($state ?? '', ' ') ?: $state);
                                }
                            }),
                        TextInput::make('name')
                            ->label('Nama singkat')
                            ->helperText('Untuk form kontak dan label proyek. Contoh: Marocco')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('badge')
                            ->label('Label tipe')
                            ->placeholder('Residential / Commercial')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('price_label')
                            ->label('Harga / status harga')
                            ->placeholder('Mulai Rp 1.800.000.000 atau Segera Hadir')
                            ->helperText(fn (Get $get): string => PriceLabelHelper::helperText($get('price_label')))
                            ->live(debounce: 150)
                            ->afterStateUpdated(function (?string $state, Set $set): void {
                                $formatted = PriceLabelHelper::formatDigitsInPlace($state);

                                if ($formatted !== null && $formatted !== $state) {
                                    $set('price_label', $formatted);
                                }
                            })
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('excerpt')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->label('Deskripsi halaman klaster')
                            ->rows(4)
                            ->columnSpanFull(),
                        Toggle::make('featured')
                            ->label('Tampil di preview beranda')
                            ->helperText('Klaster unggulan muncul di section beranda.'),
                        Toggle::make('is_published')
                            ->label('Publikasikan')
                            ->default(true),
                    ]),
                Section::make('Foto utama')
                    ->schema([
                        Placeholder::make('legacy_image_notice')
                            ->label('Gambar saat ini')
                            ->content(function (?Cluster $record): HtmlString|string {
                                if (! $record?->usesLegacyImagePath()) {
                                    return '';
                                }

                                $src = e($record->image);

                                return new HtmlString(
                                    '<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Gambar statis. Upload baru untuk mengganti.</p>'
                                    .'<img src="'.$src.'" alt="" class="max-h-48 rounded-lg border object-cover" />'
                                );
                            })
                            ->visible(fn (?Cluster $record): bool => $record?->usesLegacyImagePath() ?? false)
                            ->columnSpanFull(),
                        FileUpload::make('image')
                            ->label('Foto kartu klaster')
                            ->image()
                            ->disk('public')
                            ->directory('clusters')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->required(fn (?Cluster $record): bool => $record === null)
                            ->mutateDehydratedStateUsing(function (mixed $state, ?Cluster $record): ?string {
                                if (filled($state)) {
                                    return is_array($state) ? (string) reset($state) : (string) $state;
                                }

                                return $record?->image;
                            })
                            ->columnSpanFull(),
                        TextInput::make('image_alt')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),
                Section::make('Spesifikasi & tombol')
                    ->schema([
                        Repeater::make('specs')
                            ->label('Spesifikasi (ikon + label)')
                            ->schema([
                                FontAwesomeIconPicker::make('icon')
                                    ->label('Ikon')
                                    ->required(),
                                TextInput::make('label')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(1)
                            ->columnSpanFull(),
                        FontAwesomeIconPicker::make('hover_cta.icon')
                            ->label('Ikon hover kartu'),
                        TextInput::make('hover_cta.label')
                            ->label('Teks hover kartu'),
                        TextInput::make('hover_cta.href')
                            ->label('Link hover kartu')
                            ->placeholder('/#virtual-tour'),
                        TextInput::make('cta.label')
                            ->label('Teks tombol utama'),
                        TextInput::make('cta.href')
                            ->label('Link tombol utama')
                            ->placeholder('/#contact'),
                    ])
                    ->columns(2),
                Section::make('Site plan / peta blok')
                    ->description('Upload denah, lalu seret atau gambar kotak blok langsung di atas gambar.')
                    ->schema([
                        FileUpload::make('site_plan_image')
                            ->label('Gambar site plan')
                            ->image()
                            ->disk('public')
                            ->directory('clusters/site-plans')
                            ->visibility('public')
                            ->maxSize(8192)
                            ->live()
                            ->mutateDehydratedStateUsing(function (mixed $state, ?Cluster $record): ?string {
                                if (filled($state)) {
                                    return is_array($state) ? (string) reset($state) : (string) $state;
                                }

                                return $record?->site_plan_image;
                            })
                            ->columnSpanFull(),
                        SitePlanBlockEditor::make('site_plan_blocks')
                            ->label('Blok unit')
                            ->sitePlanImageField('site_plan_image')
                            ->columnSpanFull(),
                    ]),
                Section::make('Pengaturan lanjutan')
                    ->collapsed()
                    ->schema([
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
