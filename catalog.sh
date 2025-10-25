#!/bin/bash

# Search recursively for package.json and deno.json files containing "hono", "kysely", or "zod"
# Exclude node_modules and .git directories
find . \( -path "*/node_modules" -o -path "*/.git" \) -prune -o \( -name "package.json" -o -name "deno.json" \) -print | xargs grep -E '"hono"|"kysely"|"zod"'