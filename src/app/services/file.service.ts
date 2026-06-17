import { Injectable } from '@angular/core';

import { yandexDiskConfig } from '../config/yandex.config';

export interface FileGenerationOptions {
    filename?: string;
    format?: 'json' | 'csv';
    mimeType?: string;
}

@Injectable({
    providedIn: 'root'
})
export class FileService {
    public generateFile<T>(data: T[], options: FileGenerationOptions = {}): File {
        const {
            filename = 'data.json',
            format = 'json',
            mimeType = format === 'json' ? 'application/json' : 'text/csv'
        } = options;

        let content: string;

        if (!data.length) {
            data = (yandexDiskConfig.emptyFileContent as T) as T[];
        }

        switch (format) {
            case 'json':
                content = JSON.stringify(data, null, 4);
                break;
            /*
            case 'csv':
                content = this.convertToCSV(data);
                break;
            */
            default:
                throw new Error('Unsupported format. Use "json" or "csv"');
        }

        return new File([ content ], filename, { type: mimeType });
    }

    public downloadFile(file: File): void {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');

        link.href = url;
        link.download = file.name;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

/*     private convertToCSV<T>(data: T[]): string {
        if (data.length === 0) return '';

        // Получаем заголовки из ключей первого объекта
        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');

        // Преобразуем каждую строку в CSV-формат с экранированием
        const csvRows = data.map(row =>
            headers.map(header => {
                const value = row[header as keyof T];

                // Экранируем кавычки и заключаем в кавычки при необходимости
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        );

        return [ csvHeaders, ...csvRows ].join('\n');
    } */
}
