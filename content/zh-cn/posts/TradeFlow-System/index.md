+++
date = '2025-09-13T00:00:00-00:00'
draft = false
title = '作品：TradeFlow System'
+++

[GitHub](https://github.com/lihaozhe013/tradeflow-oss)

一款专为小型企业设计的轻量级贸易流系统，前端基于 React.js 构建，后端基于 Node.js + PostgreSQL 构建。

## 核心功能

- **Inventory Management**: Track inventory levels, inbound and outbound operations
- **Product Management**: Manage product information and pricing strategies
- **Financial Tracking**: Monitor accounts payable and accounts receivable
- **Sales Analysis**: Generate reports and analyze sales data
- **Multi-language Support**: Supports English, Korean, and Chinese
- **Data Export**: Supports data export in Excel format
- **JWT Authentication**: Stateless authentication system
- **Role-Based Access Control**: Can assign **Editor** and **Viewer** to each user

## 技术栈

- **Frontend**: React 19, Vite, Ant Design, TypeScript
- **Backend**: Node.js, Express, PostgreSQL, TypeScript
- **Authentication**: JWT stateless authentication
- **Styling**: CSS3, Ant Design component library
- **Logging**: Winston logging system
- **Precise Calculations**: Decimal.js for precise numerical calculations

## Demo

This is the detailed page for my demo link:
[My Demo](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/)

![1.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/1.png)

![2.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/2.png)

![3.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/3.png)

![4.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/4.png)

![5.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/5.png)

![6.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/6.png)

![7.png](https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/7.png)

## Database Schema (Backend)

> The project uses Prisma as ORM, to support SQLite, which doesn’t support **Date**, we use TEXT for all dates instead…

### PARTNERS

| Column Name | Data Type | Key    | Nullable | Default |
| ----------- | --------- | ------ | -------- | ------- |
| code        | TEXT      | Unique | No       | NULL    |
| short_name  | TEXT      | PK     | No       | NULL    |
| full_name   | TEXT      |        | No       | NULL    |
| type        | INTEGER   |        | No       | NULL    |

### PRODUCTS

| Column Name   | Data Type | Key    | Nullable | Default |
| ------------- | --------- | ------ | -------- | ------- |
| code          | TEXT      | Unique | No       | NULL    |
| category      | TEXT      |        | No       | NULL    |
| product_model | TEXT      |        | No       | NULL    |
| remark        | TEXT      |        | No       | NULL    |

### PRODUCT PRICE

| Column Name        | Data Type | Key                                   | Nullable | Default           |
| ------------------ | --------- | ------------------------------------- | -------- | ----------------- |
| id                 | INTEGER   | UNIQUE, PK                            | No       | AI                |
| partner_short_name | TEXT      | FK $\subseteq$ PARTNERS.short_name    | No       | NULL              |
| product_model      | TEXT      | FK $\subseteq$ PRODUCTS.product_model | No       | NULL              |
| effective_date     | TEXT      |                                       | No       | CURRENT_TIMESTAMP |
| unit_price         | REAL      |                                       | No       | NULL              |

### INBOUND RECORDS

| Column Name    | Data Type | Key                          | Nullable | Default           |
| -------------- | --------- | ---------------------------- | -------- | ----------------- |
| id             | INTEGER   | UNIQUE, PK                   | No       | AI                |
| supplier_code  | TEXT      | FK $\subseteq$ PARTNERS.code | No       | NULL              |
| product_code   | TEXT      | FK $\subseteq$ PRODUCTS.code | No       | NULL              |
| quantity       | INTEGER   |                              | No       | 0                 |
| unit_price     | REAL      |                              | No       | 0                 |
| total_price    | REAL      |                              | No       | 0                 |
| inbound_date   | TEXT      |                              | No       | CURRENT_TIMESTAMP |
| invoice_date   | TEXT      |                              | Yes      | NULL              |
| invoice_number | TEXT      |                              | Yes      | NULL              |
| receipt_number | TEXT      |                              | Yes      | NULL              |
| order_number   | TEXT      |                              | Yes      | NULL              |
| remark         | TEXT      |                              | Yes      | NULL              |

### OUTBOUND RECORDS

| Column Name    | Data Type | Key                          | Nullable | Default           |
| -------------- | --------- | ---------------------------- | -------- | ----------------- |
| id             | INTEGER   | UNIQUE, PK                   | No       | AI                |
| customer_code  | TEXT      | FK $\subseteq$ PARTNERS.code | No       | NULL              |
| product_code   | TEXT      | FK $\subseteq$ PRODUCTS.code | No       | NULL              |
| quantity       | INTEGER   |                              | No       | 0                 |
| unit_price     | REAL      |                              | No       | 0                 |
| total_price    | REAL      |                              | No       | 0                 |
| outbound_date  | TEXT      |                              | No       | CURRENT_TIMESTAMP |
| invoice_date   | TEXT      |                              | Yes      | NULL              |
| invoice_number | TEXT      |                              | Yes      | NULL              |
| receipt_number | TEXT      |                              | Yes      | NULL              |
| order_number   | TEXT      |                              | Yes      | NULL              |
| remark         | TEXT      |                              | Yes      | NULL              |

### INVENTORY

| Column Name   | Data Type | Key                                       | Nullable | Default |
| ------------- | --------- | ----------------------------------------- | -------- | ------- |
| product_model | TEXT      | PK, FK $\subseteq$ PRODUCTS.product_model | No       | NULL    |
| quantity      | INTEGER   |                                           | No       | 0       |

### INVENTORY LEDGER

| Column Name   | Data Type | Key                                   | Nullable | Default           |
| ------------- | --------- | ------------------------------------- | -------- | ----------------- |
| id            | INTEGER   | UNIQUE, PK                            | No       | AI                |
| product_model | TEXT      | FK $\subseteq$ PRODUCTS.product_model | No       | NULL              |
| change_qty    | INTEGER   |                                       | No       | NULL              |
| change_type   | TEXT      |                                       | No       | NULL              |
| reference_id  | INTEGER   |                                       | Yes      | NULL              |
| date          | TEXT      |                                       | No       | NULL              |
| created_at    | TIMESTAMP |                                       | No       | CURRENT_TIMESTAMP |

### RECEIVABLE PAYMENTS

| Column Name   | Data Type | Key                          | Nullable | Default           |
| ------------- | --------- | ---------------------------- | -------- | ----------------- |
| id            | INTEGER   | UNIQUE, PK                   | No       | AI                |
| customer_code | TEXT      | FK $\subseteq$ PARTNERS.code | No       | NULL              |
| amount        | REAL      |                              | No       | 0                 |
| pay_date      | TEXT      |                              | No       | CURRENT_TIMESTAMP |
| pay_method    | TEXT      |                              | Yes      | NULL              |
| remark        | TEXT      |                              | Yes      | NULL              |

### PAYABLE PAYMENTS

| Column Name   | Data Type | Key                          | Nullable | Default           |
| ------------- | --------- | ---------------------------- | -------- | ----------------- |
| id            | INTEGER   | UNIQUE, PK                   | No       | AI                |
| supplier_code | TEXT      | FK $\subseteq$ PARTNERS.code | No       | NULL              |
| amount        | REAL      |                              | No       | 0                 |
| pay_date      | TEXT      |                              | No       | CURRENT_TIMESTAMP |
| pay_method    | TEXT      |                              | Yes      | NULL              |
| remark        | TEXT      |                              | Yes      | NULL              |

### SYSTEM LOGS

| Column Name | Data Type | Key        | Nullable | Default           |
| ----------- | --------- | ---------- | -------- | ----------------- |
| id          | INTEGER   | UNIQUE, PK | No       | AI                |
| username    | TEXT      |            | Yes      | NULL              |
| action      | TEXT      |            | No       | NULL              |
| resource    | TEXT      |            | No       | NULL              |
| user_agent  | TEXT      |            | Yes      | NULL              |
| params      | TEXT      |            | Yes      | NULL              |
| created_at  | TIMESTAMP |            | No       | CURRENT_TIMESTAMP |

## API 概要

- **Base URL**: `/api`
- **Auth**: `POST /api/login` returns a JWT; include `Authorization: Bearer <token>` in subsequent requests.

Key endpoints (high level):

| Area                 | Method & Path                                                        | Purpose                                                                        |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Auth                 | `POST /api/login`                                                    | Exchange credentials for JWT                                                   |
| Overview             | `GET /api/overview/stats`                                            | Fetch dashboard metrics                                                        |
| Overview             | `POST /api/overview/stats`                                           | Trigger metrics recomputation                                                  |
| Products             | `/api/products` (GET, POST, PUT, DELETE)                             | CRUD endpoints for product catalog                                             |
| Partners             | `/api/partners` (GET, POST, PUT, DELETE)                             | CRUD endpoints for customers/suppliers                                         |
| Pricing              | `/api/product-prices` (GET, POST, PUT, DELETE)                       | CRUD partner-specific product prices (also see `/current` and `/auto` helpers) |
| Inventory Inbound    | `/api/inbound` (GET, POST, PUT, DELETE); `POST /api/inbound/batch`   | Receive goods and perform batch updates                                        |
| Inventory Outbound   | `/api/outbound` (GET, POST, PUT, DELETE); `POST /api/outbound/batch` | Ship goods and perform batch updates                                           |
| Stock                | `GET /api/stock`                                                     | Real-time stock summary by product                                             |
| Finance - Receivable | `/api/receivable/payments` (GET, POST, PUT, DELETE)                  | Track customer payments                                                        |
| Finance - Payable    | `/api/payable/payments` (GET, POST, PUT, DELETE)                     | Track supplier payments                                                        |
| Export               | `POST /api/export/:type`                                             | Export configured datasets (e.g., inventory, base-info, invoice)               |
