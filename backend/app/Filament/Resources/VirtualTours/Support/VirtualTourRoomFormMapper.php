<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Support;

final class VirtualTourRoomFormMapper
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function toModel(array $data): array
    {
        $data['camera_position'] = [
            (float) ($data['camera_pos_x'] ?? 0),
            (float) ($data['camera_pos_y'] ?? 1.7),
            (float) ($data['camera_pos_z'] ?? 0),
        ];
        $data['camera_target'] = [
            (float) ($data['camera_tgt_x'] ?? 0),
            (float) ($data['camera_tgt_y'] ?? 1.6),
            (float) ($data['camera_tgt_z'] ?? 0),
        ];
        $data['bounds'] = [
            'x' => [(float) ($data['bounds_x_min'] ?? -10), (float) ($data['bounds_x_max'] ?? 0)],
            'z' => [(float) ($data['bounds_z_min'] ?? -8), (float) ($data['bounds_z_max'] ?? 0)],
        ];

        if (isset($data['model_pos_x'], $data['model_pos_y'], $data['model_pos_z'])) {
            $data['model_position'] = [
                (float) $data['model_pos_x'],
                (float) $data['model_pos_y'],
                (float) $data['model_pos_z'],
            ];
        }

        $data['model_scale'] = (float) ($data['model_scale'] ?? 1);

        $data['furniture'] = self::mapFurnitureToModel($data['furniture_items'] ?? []);
        $data['door_openings'] = array_values(array_map(
            fn (array $opening): array => [
                'side' => $opening['side'],
                'center' => (float) $opening['center'],
            ],
            $data['door_openings_items'] ?? [],
        ));

        unset(
            $data['camera_pos_x'], $data['camera_pos_y'], $data['camera_pos_z'],
            $data['camera_tgt_x'], $data['camera_tgt_y'], $data['camera_tgt_z'],
            $data['bounds_x_min'], $data['bounds_x_max'], $data['bounds_z_min'], $data['bounds_z_max'],
            $data['furniture_items'], $data['door_openings_items'],
            $data['model_pos_x'], $data['model_pos_y'], $data['model_pos_z'],
        );

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function toForm(array $data): array
    {
        $pos = $data['camera_position'] ?? [-3.5, 1.7, -2.5];
        $tgt = $data['camera_target'] ?? [-5, 1.6, -4];
        $bounds = $data['bounds'] ?? ['x' => [-10, 0], 'z' => [-8, 0]];

        $data['camera_pos_x'] = $pos[0] ?? -3.5;
        $data['camera_pos_y'] = $pos[1] ?? 1.7;
        $data['camera_pos_z'] = $pos[2] ?? -2.5;
        $data['camera_tgt_x'] = $tgt[0] ?? -5;
        $data['camera_tgt_y'] = $tgt[1] ?? 1.6;
        $data['camera_tgt_z'] = $tgt[2] ?? -4;
        $data['bounds_x_min'] = $bounds['x'][0] ?? -10;
        $data['bounds_x_max'] = $bounds['x'][1] ?? 0;
        $data['bounds_z_min'] = $bounds['z'][0] ?? -8;
        $data['bounds_z_max'] = $bounds['z'][1] ?? 0;
        $data['furniture_items'] = self::mapFurnitureToForm($data['furniture'] ?? []);
        $data['door_openings_items'] = $data['door_openings'] ?? [];
        $pos = $data['model_position'] ?? [0, 0, 0];
        $data['model_pos_x'] = $pos[0] ?? 0;
        $data['model_pos_y'] = $pos[1] ?? 0;
        $data['model_pos_z'] = $pos[2] ?? 0;
        $data['model_scale'] = $data['model_scale'] ?? 1;

        return $data;
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @return array<int, array<string, mixed>>
     */
    public static function mapFurnitureToModel(array $items): array
    {
        return array_values(array_filter(array_map(function (array $item): ?array {
            $type = $item['type'] ?? null;
            if (blank($type)) {
                return null;
            }

            $result = [
                'type' => $type,
                'position' => [
                    (float) ($item['pos_x'] ?? 0),
                    (float) ($item['pos_y'] ?? 0),
                    (float) ($item['pos_z'] ?? 0),
                ],
                'color' => $item['color'] ?? '#ffffff',
            ];

            if (filled($item['emissive'] ?? null)) {
                $result['emissive'] = $item['emissive'];
                $result['emissiveIntensity'] = (float) ($item['emissive_intensity'] ?? 0.4);
            }

            if (($item['transparent'] ?? false) === true) {
                $result['transparent'] = true;
                $result['opacity'] = (float) ($item['opacity'] ?? 0.3);
            }

            return match ($type) {
                'box' => array_merge($result, [
                    'size' => [
                        (float) ($item['size_w'] ?? 1),
                        (float) ($item['size_h'] ?? 1),
                        (float) ($item['size_d'] ?? 1),
                    ],
                ]),
                'sphere' => array_merge($result, [
                    'radius' => (float) ($item['radius'] ?? 0.2),
                ]),
                'cylinder' => array_merge($result, [
                    'size' => [
                        (float) ($item['cyl_r'] ?? 0.2),
                        (float) ($item['cyl_r'] ?? 0.2),
                        (float) ($item['cyl_h'] ?? 1),
                    ],
                ]),
                'cone' => array_merge($result, [
                    'radius' => (float) ($item['radius'] ?? 0.5),
                    'height' => (float) ($item['cone_h'] ?? 1),
                ]),
                default => $result,
            };
        }, $items)));
    }

    /**
     * @param  array<int, array<string, mixed>>  $furniture
     * @return array<int, array<string, mixed>>
     */
    public static function mapFurnitureToForm(array $furniture): array
    {
        return array_map(function (array $item): array {
            $form = [
                'label' => $item['label'] ?? null,
                'type' => $item['type'] ?? 'box',
                'pos_x' => $item['position'][0] ?? 0,
                'pos_y' => $item['position'][1] ?? 0,
                'pos_z' => $item['position'][2] ?? 0,
                'color' => $item['color'] ?? '#ffffff',
                'emissive' => $item['emissive'] ?? null,
                'emissive_intensity' => $item['emissiveIntensity'] ?? 0.4,
                'transparent' => $item['transparent'] ?? false,
                'opacity' => $item['opacity'] ?? 0.3,
            ];

            if (($item['type'] ?? '') === 'box') {
                $form['size_w'] = $item['size'][0] ?? 1;
                $form['size_h'] = $item['size'][1] ?? 1;
                $form['size_d'] = $item['size'][2] ?? 1;
            }

            if (($item['type'] ?? '') === 'sphere') {
                $form['radius'] = $item['radius'] ?? 0.2;
            }

            if (($item['type'] ?? '') === 'cylinder') {
                $form['cyl_r'] = $item['size'][0] ?? 0.2;
                $form['cyl_h'] = $item['size'][2] ?? 1;
            }

            if (($item['type'] ?? '') === 'cone') {
                $form['radius'] = $item['radius'] ?? 0.5;
                $form['cone_h'] = $item['height'] ?? 1;
            }

            return $form;
        }, $furniture);
    }
}
