# API Documentation - PCCS Landing

## 📡 API Endpoints Reference

This document provides comprehensive documentation for all API endpoints in the PCCS Landing project.

---

## Base URL

**Development**: `http://localhost:3000/api`
**Production**: `https://pccs.edu.do/api`

---

## Authentication

Currently, no authentication is required for public endpoints. Payment endpoints use server-side validation and Azul gateway authentication.

---

## Endpoints

### Donation Types

#### GET `/api/donation-types`

Get all available donation types.

**Request**:
```http
GET /api/donation-types
```

**Response** (200 OK):
```json
{
  "success": true,
  "types": [
    {
      "id": "clxxxxx",
      "name": "School Supplies",
      "description": "Support students with essential school materials",
      "amount": 50.00,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    },
    {
      "id": "clyyyyy",
      "name": "Scholarships",
      "description": "Help students access quality education",
      "amount": 100.00,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

**Response** (500 Error):
```json
{
  "success": false,
  "error": "Failed to fetch donation types"
}
```

**Usage Example**:
```typescript
const response = await fetch('/api/donation-types');
const data = await response.json();

if (data.success) {
  console.log(data.types);
}
```

---

#### POST `/api/donation-types/seed`

Seed the database with initial donation types (Development only).

**Request**:
```http
POST /api/donation-types/seed
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Donation types seeded successfully",
  "count": 5
}
```

**Response** (500 Error):
```json
{
  "success": false,
  "error": "Failed to seed donation types"
}
```

**Default Seeded Types**:
1. School Supplies ($50)
2. Scholarships ($100)
3. Infrastructure ($200)
4. General Donation ($25)
5. Sponsor a Child ($75)

---

### Donations

#### GET `/api/donations/[id]`

Get details of a specific donation by ID.

**Request**:
```http
GET /api/donations/clxxxxx123456
```

**Response** (200 OK):
```json
{
  "success": true,
  "donation": {
    "id": "clxxxxx123456",
    "amount": 50.00,
    "status": "completed",
    "donationTypeId": "clyyyyy",
    "orderNumber": "ORD-1234567890",
    "transactionId": "AZUL-987654321",
    "responseCode": "00",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:05:00.000Z"
  }
}
```

**Response** (404 Not Found):
```json
{
  "success": false,
  "error": "Donation not found"
}
```

**Response** (500 Error):
```json
{
  "success": false,
  "error": "Failed to fetch donation"
}
```

---

### Payment Gateway (Azul)

#### POST `/api/azul/initiate-payment`

Initiate a payment transaction with Azul payment gateway.

**Request**:
```http
POST /api/azul/initiate-payment
Content-Type: application/json

{
  "amount": 50.00,
  "description": "School Supplies Donation",
  "donationTypeId": "clyyyyy"
}
```

**Request Body**:
```typescript
interface InitiatePaymentRequest {
  amount: number;          // Amount in dollars
  description: string;     // Payment description
  donationTypeId?: string; // Optional donation type ID
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "paymentFormHtml": "<form id=\"azulForm\" method=\"post\" action=\"https://pruebas.azul.com.do/PaymentPage\">\n  <input type=\"hidden\" name=\"MerchantId\" value=\"...\" />\n  ...\n</form>",
  "donationId": "clxxxxx123456",
  "orderNumber": "ORD-1234567890"
}
```

**Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "Amount and description are required"
}
```

**Response** (500 Error):
```json
{
  "success": false,
  "error": "Failed to initiate payment"
}
```

**Process Flow**:
1. Validates request data
2. Creates donation record with status "pending"
3. Generates unique order number
4. Calculates amount in cents (Azul format)
5. Creates HMAC-SHA512 auth hash
6. Generates HTML form for Azul gateway
7. Returns form HTML to client
8. Client submits form to Azul
9. User completes payment
10. Azul redirects to callback URL

**Security**:
- Uses HMAC-SHA512 authentication
- Server-side validation
- Secure random order numbers
- Environment-based merchant credentials

---

#### POST `/api/azul/validate-response`

Validate payment response from Azul gateway.

**Request**:
```http
POST /api/azul/validate-response
Content-Type: application/json

{
  "queryString": "OrderNumber=ORD-1234567890&Amount=5000&DateTime=20240115120000&ResponseCode=00&IsoCode=00&AuthorizationCode=123456&RRN=987654&CustomOrderId=clxxxxx123456",
  "callbackType": "approved"
}
```

**Request Body**:
```typescript
interface ValidateResponseRequest {
  queryString: string;                             // Query params from Azul
  callbackType: 'approved' | 'declined' | 'cancelled'; // Callback type
}
```

**Response** (200 OK - Approved):
```json
{
  "success": true,
  "response": {
    "OrderNumber": "ORD-1234567890",
    "Amount": "5000",
    "DateTime": "20240115120000",
    "ResponseCode": "00",
    "IsoCode": "00",
    "AuthorizationCode": "123456",
    "RRN": "987654",
    "CustomOrderId": "clxxxxx123456"
  },
  "transactionId": "clxxxxx123456"
}
```

**Response** (200 OK - Declined):
```json
{
  "success": true,
  "response": {
    "OrderNumber": "ORD-1234567890",
    "Amount": "5000",
    "DateTime": "20240115120000",
    "ResponseCode": "05",
    "IsoCode": "05",
    "CustomOrderId": "clxxxxx123456"
  }
}
```

**Response** (200 OK - Cancelled):
```json
{
  "success": true,
  "response": {
    "OrderNumber": "ORD-1234567890",
    "CustomOrderId": "clxxxxx123456"
  }
}
```

**Response** (400 Bad Request):
```json
{
  "success": false,
  "error": "Query string is required"
}
```

**Response** (500 Error):
```json
{
  "success": false,
  "error": "Failed to validate response"
}
```

**Process Flow**:
1. Parses query string from Azul
2. Extracts donation ID from CustomOrderId
3. Updates donation status based on callback type:
   - `approved` → status: "completed"
   - `declined` → status: "failed"
   - `cancelled` → status: "cancelled"
4. Stores transaction details
5. Returns parsed response data

**Database Updates**:
```typescript
// For approved payments
{
  status: 'completed',
  transactionId: response.AuthorizationCode,
  responseCode: response.ResponseCode,
  updatedAt: new Date()
}

// For declined payments
{
  status: 'failed',
  responseCode: response.ResponseCode,
  updatedAt: new Date()
}

// For cancelled payments
{
  status: 'cancelled',
  updatedAt: new Date()
}
```

---

## Data Models

### DonationType Model

```typescript
model DonationType {
  id          String      @id @default(cuid())
  name        String      @unique
  description String?
  amount      Float
  donations   Donation[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### Donation Model

```typescript
model Donation {
  id             String        @id @default(cuid())
  amount         Float
  status         String        @default("pending") // pending, completed, failed, cancelled
  donationTypeId String?
  donationType   DonationType? @relation(fields: [donationTypeId], references: [id])
  orderNumber    String?       @unique
  transactionId  String?
  responseCode   String?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}
```

---

## Error Codes

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (Invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

### Azul Response Codes

Common response codes from Azul gateway:

| Code | Description |
|------|-------------|
| `00` | Approved |
| `05` | Do not honor / Declined |
| `14` | Invalid card number |
| `41` | Lost card |
| `43` | Stolen card |
| `51` | Insufficient funds |
| `54` | Expired card |
| `55` | Incorrect PIN |
| `57` | Transaction not permitted |
| `61` | Exceeds withdrawal limit |
| `65` | Exceeds withdrawal frequency |
| `91` | Issuer or switch inoperative |

**Full list**: See `src/lib/azul/validator.ts` → `getErrorMessage()`

---

## Environment Variables

Required environment variables for API functionality:

```bash
# Database
DATABASE_URL="postgresql://..."

# Azul Payment Gateway
AZUL_MERCHANT_ID="your_merchant_id"
AZUL_MERCHANT_NAME="PCCS Education"
AZUL_MERCHANT_TYPE="eCommerce"
AZUL_CURRENCY_CODE="$"
AZUL_AUTH_KEY="your_auth_key"
AZUL_PAYMENT_URL="https://pruebas.azul.com.do/PaymentPage"

# Callback URLs
NEXT_PUBLIC_BASE_URL="https://pccs.edu.do"
AZUL_APPROVED_URL="https://pccs.edu.do/Approved"
AZUL_DECLINED_URL="https://pccs.edu.do/Declined"
AZUL_CANCELLED_URL="https://pccs.edu.do/Cancel"
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding:
- Request throttling
- IP-based limiting
- API key authentication (for admin endpoints)

---

## Testing

### Test Endpoints

**Seed Database**:
```bash
curl -X POST http://localhost:3000/api/donation-types/seed
```

**Get Donation Types**:
```bash
curl http://localhost:3000/api/donation-types
```

**Initiate Payment**:
```bash
curl -X POST http://localhost:3000/api/azul/initiate-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "description": "Test Donation",
    "donationTypeId": "clxxxxx"
  }'
```

### Test Cards (Azul Sandbox)

Test cards for development environment:

**Approved Transaction**:
- Card: `4035 8740 0000 0008`
- CVV: Any 3 digits
- Exp: Any future date

**Declined Transaction**:
- Card: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Exp: Any future date

---

## API Client Example

```typescript
// API Client Class
class PCCSApi {
  private baseUrl: string;

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  async getDonationTypes() {
    const response = await fetch(`${this.baseUrl}/donation-types`);
    return response.json();
  }

  async initiatePayment(amount: number, description: string, donationTypeId?: string) {
    const response = await fetch(`${this.baseUrl}/azul/initiate-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, description, donationTypeId })
    });
    return response.json();
  }

  async getDonation(id: string) {
    const response = await fetch(`${this.baseUrl}/donations/${id}`);
    return response.json();
  }
}

// Usage
const api = new PCCSApi();
const types = await api.getDonationTypes();
```

---

## Security Best Practices

1. **Never expose sensitive keys** in client-side code
2. **Validate all inputs** on the server side
3. **Use HTTPS** in production
4. **Implement CSRF protection** for state-changing operations
5. **Log all transactions** for audit trail
6. **Monitor for suspicious activity**
7. **Keep dependencies updated**
8. **Use environment variables** for configuration

---

## Future Enhancements

### Planned Features

1. **Webhook Support**: Real-time payment notifications
2. **Recurring Donations**: Subscription-based giving
3. **Receipt Generation**: PDF receipts via email
4. **Refund API**: Process refunds programmatically
5. **Analytics API**: Donation statistics and reporting
6. **Admin API**: Manage donations and types
7. **Donor Profiles**: Save donor information
8. **Email Notifications**: Thank you emails

---

## Troubleshooting

### Common Issues

**Issue**: Payment form not submitting
**Solution**: Check Azul credentials in environment variables

**Issue**: Donation status not updating
**Solution**: Verify callback URLs are accessible from Azul servers

**Issue**: Invalid auth hash error
**Solution**: Ensure AZUL_AUTH_KEY matches the one provided by Azul

**Issue**: Database connection errors
**Solution**: Check DATABASE_URL and Prisma client configuration

---

## Support

For API-related issues or questions:
- Email: dev@pccs.edu.do
- Documentation: https://docs.pccs.edu.do/api
- Azul Support: https://www.azul.com.do/soporte

---

**Last Updated**: 2025-11-14
**Version**: 1.0
**API Version**: v1
