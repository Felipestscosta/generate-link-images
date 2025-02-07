import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'

import axios from 'axios'

// Configuração do cliente S3
const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

// Configuração do Multer com Multer-S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME as string,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname); // Define o nome do arquivo no S3
        },
        contentType: function (req, file, cb) {
            cb(null, file.mimetype); // Define o Content-Type com base no tipo do arquivo
        }
    }),
});

export const config = {
    api: {
        bodyParser: false, // Desabilita o bodyParser padrão do Next.js
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const metodoDeRequisicao = req.method;

    if(metodoDeRequisicao === 'POST'){
        upload.single('file')(req as any, res as any, async (err) => {
            if (err) {
                console.error("Problema no upload:", err);
                return res.status(500).json({ message: "Problema no upload para S3" });
            }

            // @ts-ignore
            const file = req.file;
            console.log(file);

            res.status(200).json({ message: "Upload do arquivo feito com sucesso", file: file });
        });
    }else {
        res.status(405).json({ message: "Diferente do Método POST" });
    }
}