#!/bin/bash
cd /home/kavia/workspace/code-generation/beauty-products-catalog-220996-221005/beauty_product_catalogue_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

