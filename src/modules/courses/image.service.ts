import axios from 'axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

@Injectable()
export class ImageService {
  async createFileKey(file: any) {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    const response = await axios.post(
      'https://te-amp-2.cybozu-dev.com/k/v1/file.json',
      formData,
      {
        headers: {
          'X-Cybozu-API-Token': 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV',
          ...formData.getHeaders(),
        },
      },
    );
    return response.data.fileKey;
  }

  async uploadDataToKintone(courseName: string, file: any) {
    const fileKey = await this.createFileKey(file)
    const res = await axios.post(
      'https://te-amp-2.cybozu-dev.com/k/v1/record.json',
      {
        app: '41',
        record: {
          Table: {
            value: [
              {
                value: {
                  course_name: {
                    value: courseName,
                  },
                  attachment: {
                    value: [
                      {
                        fileKey: fileKey,
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        headers: {
          'X-Cybozu-API-Token': 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV',
        },
      },
    );

    return res.data.id;
  }

  async getFileKey(recordId: string) {
    const getRecord = await axios.get(
      `https://te-amp-2.cybozu-dev.com/k/v1/record.json?app=41&id=${recordId}`,
      {
        headers: {
          'X-Cybozu-API-Token': 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV',
        },
      },
    );

    return getRecord.data.record.Table.value[0].value.attachment.value[0].fileKey;
  }

  async getImageFromKintone(fileKey: string) {
    const url = `https://te-amp-2.cybozu-dev.com/k/v1/file.json?fileKey=${fileKey}`
    const res = await axios.get( url, {
        headers: {
          'X-Cybozu-API-Token': 'wbTEYNrUZDFbWySYlOvQ3acgWwTAec7SGykYtyUV',
        },
        responseType: 'arraybuffer',
      },
    );
    return res.data;
  }
}
