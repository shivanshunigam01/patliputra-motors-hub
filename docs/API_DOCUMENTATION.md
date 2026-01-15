# Patliputra Virtual Showroom - Backend API Documentation

**Version:** 1.0  
**Last Updated:** January 2025  
**Base URL:** `https://api.patliputraautos.com/v1`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Banner/Hero Management](#2-bannerhero-management)
3. [Brand Management](#3-brand-management)
4. [Product Management](#4-product-management)
5. [Product Categories](#5-product-categories)
6. [New Arrivals](#6-new-arrivals)
7. [Used Vehicles](#7-used-vehicles)
8. [Testimonials](#8-testimonials)
9. [Trust Section](#9-trust-section)
10. [EMI Calculator Settings](#10-emi-calculator-settings)
11. [Lead/Enquiry Management](#11-leadenquiry-management)
12. [Contact Form Submissions](#12-contact-form-submissions)
13. [Finance Applications](#13-finance-applications)
14. [Product Comparison Analytics](#14-product-comparison-analytics)
15. [Site Settings](#15-site-settings)
16. [Media/File Upload](#16-mediafile-upload)
17. [Database Schema](#17-database-schema)
18. [Error Codes](#18-error-codes)

---

## 1. Authentication

### Admin Authentication

All admin endpoints require JWT Bearer token authentication.

**Headers Required:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Endpoints

#### POST `/auth/login`
Admin login to get access token.

**Request Body:**
```json
{
  "email": "admin@patliputraautos.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "refresh_token_here",
    "expires_in": 3600,
    "user": {
      "id": "uuid",
      "email": "admin@patliputraautos.com",
      "role": "admin"
    }
  }
}
```

#### POST `/auth/refresh`
Refresh access token.

#### POST `/auth/logout`
Invalidate current session.

---

## 2. Banner/Hero Management

Manage hero banners across all pages (Homepage, JCB, Ashok Leyland, Switch EV, Used Vehicles, Finance).

### Data Model

```typescript
interface Banner {
  id: string;                    // UUID
  page: BannerPage;              // Which page this banner belongs to
  title: string;                 // Main headline (supports Hindi/English)
  subtitle: string;              // Subheadline
  background_image: string;      // URL to background image
  background_video?: string;     // Optional video URL
  overlay_opacity: number;       // 0-100 (percentage)
  cta_buttons: CTAButton[];      // Array of CTA buttons
  trust_badges: string[];        // Array of trust badge texts
  customer_count?: number;       // For animated counter
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

type BannerPage = 'home' | 'jcb' | 'ashok_leyland' | 'switch_ev' | 'used_vehicles' | 'finance';

interface CTAButton {
  id: string;
  text: string;
  type: 'primary' | 'secondary' | 'outline';
  action: 'call' | 'whatsapp' | 'enquiry' | 'link';
  link?: string;
  phone?: string;
  icon?: string;
}
```

### Endpoints

#### GET `/banners`
Get all banners (Admin only).

**Query Parameters:**
- `page` (optional): Filter by page
- `is_active` (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "page": "home",
      "title": "Bihar का Bharosemand Partner",
      "subtitle": "JCB Machines | Ashok Leyland Trucks | Switch Electric Vehicles",
      "background_image": "https://storage.patliputraautos.com/banners/home-hero.jpg",
      "overlay_opacity": 40,
      "cta_buttons": [
        {
          "id": "btn1",
          "text": "Call Karein",
          "type": "primary",
          "action": "call",
          "phone": "+919876543210",
          "icon": "phone"
        }
      ],
      "trust_badges": ["Authorized Dealer", "5000+ Happy Customers"],
      "customer_count": 2500,
      "is_active": true,
      "display_order": 1
    }
  ],
  "meta": {
    "total": 6,
    "page": 1,
    "per_page": 20
  }
}
```

#### GET `/banners/:page`
Get active banner for a specific page (Public).

#### POST `/banners`
Create new banner (Admin only).

**Request Body:**
```json
{
  "page": "home",
  "title": "Bihar का Bharosemand Partner",
  "subtitle": "JCB Machines | Ashok Leyland Trucks",
  "background_image": "https://storage.patliputraautos.com/banners/home.jpg",
  "overlay_opacity": 40,
  "cta_buttons": [...],
  "trust_badges": [...],
  "customer_count": 2500,
  "is_active": true,
  "display_order": 1
}
```

#### PUT `/banners/:id`
Update banner (Admin only).

#### DELETE `/banners/:id`
Delete banner (Admin only).

---

## 3. Brand Management

Manage brand information displayed on the Brand Hub section.

### Data Model

```typescript
interface Brand {
  id: string;
  name: string;                  // JCB, Ashok Leyland, Switch Mobility, Used Vehicles
  slug: string;                  // jcb, ashok-leyland, switch-ev, used-vehicles
  tagline: string;               // "Construction Machines"
  description: string;           // Full description
  logo_url: string;
  hero_image: string;
  accent_color: string;          // Hex color code
  product_count?: number;        // Auto-calculated
  is_active: boolean;
  display_order: number;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### GET `/brands`
Get all brands.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "JCB",
      "slug": "jcb",
      "tagline": "Construction Machines",
      "description": "World's leading manufacturer of construction equipment",
      "logo_url": "https://storage.patliputraautos.com/brands/jcb-logo.png",
      "hero_image": "https://storage.patliputraautos.com/brands/jcb-hero.jpg",
      "accent_color": "#FFCB05",
      "product_count": 12,
      "is_active": true,
      "display_order": 1
    }
  ]
}
```

#### GET `/brands/:slug`
Get single brand by slug.

#### POST `/brands`
Create brand (Admin only).

#### PUT `/brands/:id`
Update brand (Admin only).

#### DELETE `/brands/:id`
Delete brand (Admin only).

---

## 4. Product Management

Core product catalog management.

### Data Model

```typescript
interface Product {
  id: string;
  brand_id: string;              // Foreign key to brands
  category_id: string;           // Foreign key to categories
  name: string;                  // "JCB 3DX Super EcoXcellence"
  slug: string;                  // "jcb-3dx-super-ecoxcellence"
  short_description: string;     // One line - "Best for Construction"
  full_description: string;      // Detailed description (HTML allowed)
  price: number;                 // Ex-showroom price in INR
  price_display: string;         // "₹16.50 Lakh*"
  
  // Images
  featured_image: string;
  gallery_images: string[];      // Array of image URLs
  
  // Specifications
  specifications: ProductSpecs;
  
  // Features
  key_features: string[];        // Bullet points
  applications: string[];        // Use cases
  
  // Flags
  is_active: boolean;
  is_new_launch: boolean;        // Shows in New Arrivals
  is_bestseller: boolean;
  is_featured: boolean;          // Larger card on brand page
  
  // Stock
  in_stock: boolean;
  
  // SEO
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

interface ProductSpecs {
  engine_power?: string;         // "81 HP"
  fuel_type?: string;            // "Diesel"
  fuel_tank_capacity?: string;   // "90 Litres"
  operating_weight?: string;     // "7,100 kg"
  max_digging_depth?: string;    // "4.72m"
  payload_capacity?: string;     // For trucks
  gvw?: string;                  // Gross Vehicle Weight
  wheelbase?: string;
  length?: string;
  width?: string;
  height?: string;
  
  // EV Specific
  battery_capacity?: string;     // "231 kWh"
  range?: string;                // "200 km"
  charging_time?: string;        // "4 hours"
  motor_power?: string;
  
  // General
  warranty?: string;             // "3 Years / 3000 Hours"
  seating_capacity?: string;
  transmission?: string;
  
  // Custom specs (flexible)
  custom_specs?: { label: string; value: string }[];
}
```

### Endpoints

#### GET `/products`
Get all products with filtering and pagination.

**Query Parameters:**
- `brand_id` (optional): Filter by brand
- `category_id` (optional): Filter by category
- `is_new_launch` (optional): Filter new launches
- `is_bestseller` (optional): Filter bestsellers
- `is_featured` (optional): Filter featured
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price
- `search` (optional): Search in name/description
- `sort_by` (optional): `price_asc`, `price_desc`, `newest`, `name`
- `page` (optional): Page number
- `per_page` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "brand_id": "brand-uuid",
      "brand": {
        "id": "brand-uuid",
        "name": "JCB",
        "slug": "jcb"
      },
      "category_id": "cat-uuid",
      "category": {
        "id": "cat-uuid",
        "name": "Backhoe Loaders",
        "slug": "backhoe-loaders"
      },
      "name": "JCB 3DX Super EcoXcellence",
      "slug": "jcb-3dx-super-ecoxcellence",
      "short_description": "Best for: Construction, Farming",
      "price": 1650000,
      "price_display": "₹16.50 Lakh*",
      "featured_image": "https://storage.patliputraautos.com/products/jcb-3dx.jpg",
      "specifications": {
        "engine_power": "81 HP",
        "fuel_type": "Diesel",
        "operating_weight": "7,100 kg",
        "max_digging_depth": "4.72m",
        "warranty": "3 Years / 3000 Hours"
      },
      "key_features": [
        "EcoXcellence Technology",
        "Low Maintenance Cost",
        "Operator Comfort Cabin"
      ],
      "is_new_launch": true,
      "is_bestseller": true,
      "is_featured": false,
      "in_stock": true
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "per_page": 20,
    "total_pages": 3
  }
}
```

#### GET `/products/:slug`
Get single product with full details.

**Response includes:**
- Full product data
- Related products (same category)
- Brand information
- Category information

#### POST `/products`
Create product (Admin only).

#### PUT `/products/:id`
Update product (Admin only).

#### DELETE `/products/:id`
Delete product (Admin only).

#### GET `/products/compare`
Get products for comparison.

**Query Parameters:**
- `ids`: Comma-separated product IDs (max 2)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "comparison_specs": [
      "Price",
      "Brand",
      "Category", 
      "Fuel Type",
      "Capacity / Payload",
      "Power",
      "Application",
      "Warranty"
    ]
  }
}
```

---

## 5. Product Categories

Manage product categories per brand.

### Data Model

```typescript
interface Category {
  id: string;
  brand_id: string;              // Categories are brand-specific
  name: string;                  // "Backhoe Loaders"
  slug: string;                  // "backhoe-loaders"
  description?: string;
  icon?: string;                 // Icon name or URL
  image?: string;
  product_count?: number;        // Auto-calculated
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### GET `/categories`
Get all categories.

**Query Parameters:**
- `brand_id` (optional): Filter by brand

#### GET `/categories/:id`
Get single category with products.

#### POST `/categories`
Create category (Admin only).

#### PUT `/categories/:id`
Update category (Admin only).

#### DELETE `/categories/:id`
Delete category (Admin only).

---

## 6. New Arrivals

Manage products shown in "New Arrivals" section on homepage.

### Endpoints

#### GET `/new-arrivals`
Get new arrival products (max 6).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "product": { ...productData },
      "display_order": 1,
      "expires_at": "2025-02-01T00:00:00Z"
    }
  ]
}
```

#### POST `/new-arrivals`
Add product to new arrivals (Admin only).

**Request Body:**
```json
{
  "product_id": "uuid",
  "display_order": 1,
  "expires_at": "2025-02-01T00:00:00Z"
}
```

#### PUT `/new-arrivals/:id`
Update new arrival order/expiry (Admin only).

#### DELETE `/new-arrivals/:id`
Remove from new arrivals (Admin only).

---

## 7. Used Vehicles

Manage certified pre-owned vehicle listings.

### Data Model

```typescript
interface UsedVehicle {
  id: string;
  vehicle_type: UsedVehicleType;
  brand: string;                 // "Ashok Leyland"
  model: string;                 // "1616 Tipper"
  year: number;                  // 2019
  kilometers: number;            // 85000
  hours?: number;                // For JCB machines
  price: number;
  price_display: string;
  emi_estimate?: number;         // Monthly EMI estimate
  
  // Images
  featured_image: string;
  gallery_images: string[];      // Min 5 images recommended
  
  // Vehicle Details
  fuel_type: string;
  ownership: string;             // "First Owner", "Second Owner"
  insurance_valid_till?: string;
  fitness_valid_till?: string;
  rc_status: string;             // "Clear", "Hypothecated"
  
  // Condition Report
  condition_report: ConditionReport;
  
  // Certifications
  is_certified: boolean;         // Patliputra 150-Point Inspection
  inspection_report_url?: string;
  has_warranty: boolean;
  warranty_details?: string;
  has_return_policy: boolean;
  return_policy_days?: number;   // e.g., 7
  finance_available: boolean;
  
  // Location
  location: string;              // "Patna Showroom"
  
  // Status
  status: 'available' | 'reserved' | 'sold';
  is_active: boolean;
  
  // Contact
  seller_name?: string;
  seller_phone?: string;
  
  // Timestamps
  listed_at: string;
  sold_at?: string;
  created_at: string;
  updated_at: string;
}

type UsedVehicleType = 'tipper' | 'bus' | 'loader' | 'jcb' | 'pickup' | 'lcv' | 'trailer' | 'other';

interface ConditionReport {
  engine: 'excellent' | 'good' | 'fair' | 'poor';
  transmission: 'excellent' | 'good' | 'fair' | 'poor';
  body: 'excellent' | 'good' | 'fair' | 'poor';
  tyres_life_percent: number;    // 0-100
  interior?: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
}
```

### Endpoints

#### GET `/used-vehicles`
Get all used vehicles with filtering.

**Query Parameters:**
- `vehicle_type` (optional): Filter by type
- `brand` (optional): Filter by brand
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price
- `min_year` (optional): Minimum year
- `max_year` (optional): Maximum year
- `max_kilometers` (optional): Maximum kilometers
- `is_certified` (optional): Only certified vehicles
- `status` (optional): Filter by status
- `sort_by` (optional): `price_asc`, `price_desc`, `newest`, `year_desc`
- `page`, `per_page`: Pagination

#### GET `/used-vehicles/:id`
Get single used vehicle details.

#### POST `/used-vehicles`
Create used vehicle listing (Admin only).

#### PUT `/used-vehicles/:id`
Update used vehicle (Admin only).

#### PATCH `/used-vehicles/:id/status`
Update vehicle status (Admin only).

**Request Body:**
```json
{
  "status": "sold",
  "sold_at": "2025-01-15T10:30:00Z"
}
```

#### DELETE `/used-vehicles/:id`
Delete used vehicle listing (Admin only).

---

## 8. Testimonials

Manage customer testimonials/reviews.

### Data Model

```typescript
interface Testimonial {
  id: string;
  customer_name: string;
  customer_title: string;        // "Patna Contractor"
  customer_photo?: string;
  rating: number;                // 1-5
  review_text: string;
  product_purchased?: string;    // Optional - which product they bought
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### GET `/testimonials`
Get all testimonials (active ones for public, all for admin).

**Query Parameters:**
- `is_featured` (optional): Filter featured only
- `limit` (optional): Limit results

#### GET `/testimonials/:id`
Get single testimonial.

#### POST `/testimonials`
Create testimonial (Admin only).

**Request Body:**
```json
{
  "customer_name": "Rajesh Kumar",
  "customer_title": "Patna Contractor",
  "customer_photo": "https://storage.patliputraautos.com/testimonials/rajesh.jpg",
  "rating": 5,
  "review_text": "JCB 3DX se hamara construction business double ho gaya...",
  "product_purchased": "JCB 3DX Super",
  "is_featured": true,
  "is_active": true,
  "display_order": 1
}
```

#### PUT `/testimonials/:id`
Update testimonial (Admin only).

#### DELETE `/testimonials/:id`
Delete testimonial (Admin only).

---

## 9. Trust Section

Manage trust pillars displayed on homepage.

### Data Model

```typescript
interface TrustPillar {
  id: string;
  icon: string;                  // Icon name from Lucide icons
  title: string;                 // "AUTHORIZED DEALER"
  description: string;           // "Bihar's official partner..."
  link_text?: string;            // "View Certificate"
  link_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### GET `/trust-pillars`
Get all trust pillars.

#### POST `/trust-pillars`
Create trust pillar (Admin only).

#### PUT `/trust-pillars/:id`
Update trust pillar (Admin only).

#### DELETE `/trust-pillars/:id`
Delete trust pillar (Admin only).

---

## 10. EMI Calculator Settings

Manage EMI calculator configuration.

### Data Model

```typescript
interface EMISettings {
  id: string;
  interest_rate: number;         // Annual interest rate (e.g., 10.5)
  min_vehicle_price: number;     // Minimum price (e.g., 500000)
  max_vehicle_price: number;     // Maximum price (e.g., 5000000)
  min_down_payment: number;      // Minimum down payment
  max_down_payment: number;      // Maximum down payment
  min_tenure_months: number;     // Minimum tenure (e.g., 12)
  max_tenure_months: number;     // Maximum tenure (e.g., 60)
  default_vehicle_price: number;
  default_down_payment: number;
  default_tenure: number;
  disclaimer_text: string;
  is_active: boolean;
  updated_at: string;
}
```

### Endpoints

#### GET `/emi-settings`
Get current EMI calculator settings.

#### PUT `/emi-settings`
Update EMI settings (Admin only).

---

## 11. Lead/Enquiry Management

**CRITICAL: This handles all customer enquiries and must be stored securely.**

### Data Model

```typescript
interface Lead {
  id: string;
  lead_number: string;           // Auto-generated: "PVS-12345"
  
  // Source Information
  source: LeadSource;
  source_page: string;           // URL where lead was captured
  source_product_id?: string;    // If from product page
  source_product_name?: string;
  
  // Customer Information
  customer_name: string;
  customer_mobile: string;       // Required - Primary contact
  customer_email?: string;
  customer_district: string;     // Bihar district
  customer_address?: string;
  
  // Interest Details
  brand_interest?: string;       // JCB, Ashok Leyland, Switch EV, Used
  product_interest?: string;     // Specific product name
  vehicle_type_interest?: string;
  budget_range?: string;
  
  // Lead Management
  status: LeadStatus;
  priority: 'high' | 'medium' | 'low';
  assigned_to?: string;          // Staff user ID
  assigned_at?: string;
  
  // Activity
  notes: LeadNote[];
  last_contacted_at?: string;
  next_followup_at?: string;
  
  // Conversion
  converted_at?: string;
  conversion_value?: number;
  
  // UTM Tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

type LeadSource = 
  | 'homepage_cta'
  | 'product_enquiry'
  | 'quick_enquiry'
  | 'whatsapp_click'
  | 'call_click'
  | 'finance_form'
  | 'used_vehicle_enquiry'
  | 'comparison_enquiry'
  | 'callback_request'
  | 'other';

type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'negotiation'
  | 'converted'
  | 'lost'
  | 'follow_up';

interface LeadNote {
  id: string;
  note: string;
  created_by: string;            // Staff user ID
  created_at: string;
}
```

### Endpoints

#### GET `/leads` (Admin only)
Get all leads with filtering.

**Query Parameters:**
- `status` (optional): Filter by status
- `source` (optional): Filter by source
- `brand_interest` (optional): Filter by brand
- `assigned_to` (optional): Filter by assigned staff
- `priority` (optional): Filter by priority
- `date_from` (optional): Start date
- `date_to` (optional): End date
- `search` (optional): Search in name/mobile
- `sort_by` (optional): `newest`, `oldest`, `priority`
- `page`, `per_page`: Pagination

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "lead_number": "PVS-12345",
      "source": "product_enquiry",
      "source_page": "/jcb/3dx-super-ecoxcellence",
      "source_product_name": "JCB 3DX Super EcoXcellence",
      "customer_name": "Rajesh Kumar",
      "customer_mobile": "+919876543210",
      "customer_district": "Patna",
      "brand_interest": "JCB",
      "product_interest": "JCB 3DX Super EcoXcellence",
      "status": "new",
      "priority": "high",
      "assigned_to": null,
      "notes": [],
      "created_at": "2025-01-15T14:30:00Z"
    }
  ],
  "meta": {
    "total": 156,
    "new_today": 12,
    "pending_followup": 8
  }
}
```

#### GET `/leads/:id` (Admin only)
Get single lead with full activity history.

#### POST `/leads` (Public - with rate limiting)
Create new lead/enquiry.

**Rate Limiting:** Max 5 requests per phone number per hour.

**Request Body:**
```json
{
  "source": "product_enquiry",
  "source_page": "/jcb/3dx-super-ecoxcellence",
  "source_product_id": "product-uuid",
  "customer_name": "Rajesh Kumar",
  "customer_mobile": "+919876543210",
  "customer_district": "Patna",
  "brand_interest": "JCB",
  "product_interest": "JCB 3DX Super EcoXcellence",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "jcb_bihar"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "lead_number": "PVS-12345",
    "message": "Enquiry received! Our team will call you within 30 minutes."
  }
}
```

#### PUT `/leads/:id` (Admin only)
Update lead details.

#### PATCH `/leads/:id/status` (Admin only)
Update lead status.

**Request Body:**
```json
{
  "status": "contacted",
  "note": "Called customer, interested in demo"
}
```

#### PATCH `/leads/:id/assign` (Admin only)
Assign lead to staff.

**Request Body:**
```json
{
  "assigned_to": "staff-user-id"
}
```

#### POST `/leads/:id/notes` (Admin only)
Add note to lead.

**Request Body:**
```json
{
  "note": "Customer wants demo next week"
}
```

#### GET `/leads/dashboard` (Admin only)
Get lead dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "today": {
      "new": 12,
      "contacted": 8,
      "converted": 2
    },
    "this_week": {
      "new": 45,
      "contacted": 32,
      "converted": 8
    },
    "this_month": {
      "new": 156,
      "contacted": 120,
      "converted": 24
    },
    "by_source": {
      "product_enquiry": 45,
      "whatsapp_click": 38,
      "quick_enquiry": 30,
      "call_click": 25,
      "finance_form": 18
    },
    "by_brand": {
      "JCB": 52,
      "Ashok Leyland": 48,
      "Switch EV": 28,
      "Used": 28
    },
    "pending_followup": 15,
    "unassigned": 8
  }
}
```

---

## 12. Contact Form Submissions

For general contact/support queries.

### Data Model

```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  replied_at?: string;
  reply_message?: string;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### POST `/contact` (Public)
Submit contact form.

**Request Body:**
```json
{
  "name": "Amit Singh",
  "mobile": "+919876543210",
  "email": "amit@email.com",
  "subject": "Service Enquiry",
  "message": "I need service for my JCB 3DX..."
}
```

#### GET `/contact` (Admin only)
Get all contact submissions.

#### PATCH `/contact/:id/status` (Admin only)
Update submission status.

---

## 13. Finance Applications

For finance/loan applications.

### Data Model

```typescript
interface FinanceApplication {
  id: string;
  application_number: string;    // Auto: "FIN-12345"
  
  // Vehicle Interest
  vehicle_type: string;          // "JCB / Machine", "Truck", etc.
  business_type: string;         // "Construction", "Transport", etc.
  approximate_budget: number;
  
  // Applicant Details
  applicant_name: string;
  applicant_mobile: string;
  applicant_district: string;
  
  // Status
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  
  // Processing
  assigned_to?: string;
  documents_received: boolean;
  documents_list?: string[];
  
  // Notes
  internal_notes?: string;
  
  // Timestamps
  submitted_at: string;
  reviewed_at?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}
```

### Endpoints

#### POST `/finance/apply` (Public)
Submit finance application.

**Request Body:**
```json
{
  "vehicle_type": "JCB / Machine",
  "business_type": "Construction",
  "approximate_budget": 1500000,
  "applicant_name": "Rajesh Kumar",
  "applicant_mobile": "+919876543210",
  "applicant_district": "Patna"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "application_number": "FIN-12345",
    "message": "Application received! Our finance team will call you within 2 hours."
  }
}
```

#### GET `/finance/applications` (Admin only)
Get all finance applications.

#### GET `/finance/applications/:id` (Admin only)
Get single application details.

#### PATCH `/finance/applications/:id/status` (Admin only)
Update application status.

---

## 14. Product Comparison Analytics

Track which products are being compared.

### Data Model

```typescript
interface ComparisonEvent {
  id: string;
  product_ids: string[];         // Array of 2 product IDs
  product_names: string[];
  user_session_id?: string;
  ip_address?: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  created_at: string;
}
```

### Endpoints

#### POST `/analytics/comparison` (Public)
Log comparison event.

**Request Body:**
```json
{
  "product_ids": ["uuid1", "uuid2"],
  "device_type": "mobile"
}
```

#### GET `/analytics/comparisons` (Admin only)
Get comparison analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_comparisons": 1250,
    "top_compared_products": [
      {
        "product_id": "uuid",
        "product_name": "JCB 3DX Super",
        "comparison_count": 156
      }
    ],
    "common_pairs": [
      {
        "products": ["JCB 3DX", "JCB 4DX"],
        "count": 89
      }
    ]
  }
}
```

---

## 15. Site Settings

General website configuration.

### Data Model

```typescript
interface SiteSettings {
  id: string;
  
  // Contact Information
  primary_phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  
  // Working Hours
  working_hours: {
    weekdays: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  
  // Social Media
  social_links: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  
  // SEO Defaults
  default_seo_title: string;
  default_seo_description: string;
  
  // Features Toggle
  features: {
    emi_calculator_enabled: boolean;
    used_vehicles_enabled: boolean;
    finance_form_enabled: boolean;
    live_chat_enabled: boolean;
    dark_mode_enabled: boolean;
  };
  
  // Analytics
  google_analytics_id?: string;
  facebook_pixel_id?: string;
  
  updated_at: string;
}
```

### Endpoints

#### GET `/settings` (Public - cached)
Get public site settings.

#### GET `/settings/admin` (Admin only)
Get full settings including analytics IDs.

#### PUT `/settings` (Admin only)
Update site settings.

---

## 16. Media/File Upload

Handle image and document uploads.

### Endpoints

#### POST `/media/upload` (Admin only)
Upload single file.

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file`
- Optional: `folder` (e.g., "products", "banners", "testimonials")

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "url": "https://storage.patliputraautos.com/products/image-123.jpg",
    "thumbnail_url": "https://storage.patliputraautos.com/products/image-123-thumb.jpg",
    "filename": "image-123.jpg",
    "size": 245678,
    "mime_type": "image/jpeg",
    "width": 1920,
    "height": 1080
  }
}
```

#### POST `/media/upload-multiple` (Admin only)
Upload multiple files.

#### DELETE `/media/:id` (Admin only)
Delete uploaded file.

#### GET `/media` (Admin only)
List all uploaded media with pagination.

---

## 17. Database Schema

### Core Tables

```sql
-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  logo_url VARCHAR(500),
  hero_image VARCHAR(500),
  accent_color VARCHAR(7),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  image VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id, slug)
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description VARCHAR(255),
  full_description TEXT,
  price DECIMAL(12, 2),
  price_display VARCHAR(50),
  featured_image VARCHAR(500),
  gallery_images TEXT[], -- Array of URLs
  specifications JSONB DEFAULT '{}',
  key_features TEXT[],
  applications TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_new_launch BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Banners
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page VARCHAR(50) NOT NULL, -- home, jcb, ashok_leyland, etc.
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  background_image VARCHAR(500),
  background_video VARCHAR(500),
  overlay_opacity INTEGER DEFAULT 40,
  cta_buttons JSONB DEFAULT '[]',
  trust_badges TEXT[],
  customer_count INTEGER,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Used Vehicles
CREATE TABLE used_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type VARCHAR(50) NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  kilometers INTEGER,
  hours INTEGER,
  price DECIMAL(12, 2) NOT NULL,
  price_display VARCHAR(50),
  emi_estimate DECIMAL(10, 2),
  featured_image VARCHAR(500),
  gallery_images TEXT[],
  fuel_type VARCHAR(50),
  ownership VARCHAR(50),
  insurance_valid_till DATE,
  fitness_valid_till DATE,
  rc_status VARCHAR(50),
  condition_report JSONB DEFAULT '{}',
  is_certified BOOLEAN DEFAULT false,
  inspection_report_url VARCHAR(500),
  has_warranty BOOLEAN DEFAULT false,
  warranty_details VARCHAR(255),
  has_return_policy BOOLEAN DEFAULT false,
  return_policy_days INTEGER,
  finance_available BOOLEAN DEFAULT true,
  location VARCHAR(255),
  status VARCHAR(20) DEFAULT 'available',
  is_active BOOLEAN DEFAULT true,
  seller_name VARCHAR(100),
  seller_phone VARCHAR(20),
  listed_at TIMESTAMPTZ DEFAULT NOW(),
  sold_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100) NOT NULL,
  customer_title VARCHAR(100),
  customer_photo VARCHAR(500),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  product_purchased VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trust Pillars
CREATE TABLE trust_pillars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon VARCHAR(50),
  title VARCHAR(100) NOT NULL,
  description TEXT,
  link_text VARCHAR(100),
  link_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_number VARCHAR(20) UNIQUE NOT NULL,
  source VARCHAR(50) NOT NULL,
  source_page VARCHAR(500),
  source_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  source_product_name VARCHAR(255),
  customer_name VARCHAR(100) NOT NULL,
  customer_mobile VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  customer_district VARCHAR(100),
  customer_address TEXT,
  brand_interest VARCHAR(100),
  product_interest VARCHAR(255),
  vehicle_type_interest VARCHAR(50),
  budget_range VARCHAR(50),
  status VARCHAR(20) DEFAULT 'new',
  priority VARCHAR(10) DEFAULT 'medium',
  assigned_to UUID,
  assigned_at TIMESTAMPTZ,
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  conversion_value DECIMAL(12, 2),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead Notes
CREATE TABLE lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  mobile VARCHAR(20) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  replied_at TIMESTAMPTZ,
  reply_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finance Applications
CREATE TABLE finance_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number VARCHAR(20) UNIQUE NOT NULL,
  vehicle_type VARCHAR(100),
  business_type VARCHAR(100),
  approximate_budget DECIMAL(12, 2),
  applicant_name VARCHAR(100) NOT NULL,
  applicant_mobile VARCHAR(20) NOT NULL,
  applicant_district VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to UUID,
  documents_received BOOLEAN DEFAULT false,
  documents_list TEXT[],
  internal_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EMI Settings
CREATE TABLE emi_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interest_rate DECIMAL(5, 2) NOT NULL,
  min_vehicle_price DECIMAL(12, 2),
  max_vehicle_price DECIMAL(12, 2),
  min_down_payment DECIMAL(12, 2),
  max_down_payment DECIMAL(12, 2),
  min_tenure_months INTEGER,
  max_tenure_months INTEGER,
  default_vehicle_price DECIMAL(12, 2),
  default_down_payment DECIMAL(12, 2),
  default_tenure INTEGER,
  disclaimer_text TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_phone VARCHAR(20),
  whatsapp_number VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  working_hours JSONB,
  social_links JSONB,
  default_seo_title VARCHAR(60),
  default_seo_description VARCHAR(160),
  features JSONB DEFAULT '{}',
  google_analytics_id VARCHAR(50),
  facebook_pixel_id VARCHAR(50),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comparison Analytics
CREATE TABLE comparison_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_ids UUID[] NOT NULL,
  product_names TEXT[],
  user_session_id VARCHAR(100),
  ip_address INET,
  device_type VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Files
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  filename VARCHAR(255),
  original_filename VARCHAR(255),
  folder VARCHAR(100),
  size INTEGER,
  mime_type VARCHAR(100),
  width INTEGER,
  height INTEGER,
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- New Arrivals (Junction table)
CREATE TABLE new_arrivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_mobile ON leads(customer_mobile);
CREATE INDEX idx_used_vehicles_status ON used_vehicles(status);
CREATE INDEX idx_banners_page ON banners(page);
```

---

## 18. Error Codes

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "customer_mobile",
        "message": "Invalid phone number format"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

### Validation Rules

- **Phone numbers:** Must be valid Indian mobile numbers (+91 followed by 10 digits)
- **Email:** Standard email format validation
- **Price:** Must be positive number
- **Rating:** Integer between 1-5
- **URLs:** Must be valid HTTP/HTTPS URLs
- **Slugs:** Lowercase, alphanumeric with hyphens only

---

## Webhook Notifications (Optional)

### Lead Created Webhook

When a new lead is created, send webhook to configured URL:

```json
{
  "event": "lead.created",
  "data": {
    "lead_number": "PVS-12345",
    "customer_name": "Rajesh Kumar",
    "customer_mobile": "+919876543210",
    "source": "product_enquiry",
    "product_interest": "JCB 3DX Super",
    "created_at": "2025-01-15T14:30:00Z"
  }
}
```

### Finance Application Webhook

```json
{
  "event": "finance.application_created",
  "data": {
    "application_number": "FIN-12345",
    "applicant_name": "Rajesh Kumar",
    "applicant_mobile": "+919876543210",
    "vehicle_type": "JCB / Machine",
    "approximate_budget": 1500000,
    "submitted_at": "2025-01-15T14:30:00Z"
  }
}
```

---

## API Rate Limits

| Endpoint Type | Rate Limit |
|---------------|------------|
| Public (GET) | 100 requests/minute |
| Public (POST) - Leads | 5 requests/phone/hour |
| Public (POST) - Contact | 3 requests/IP/hour |
| Admin (All) | 1000 requests/minute |

---

## Security Requirements

1. **HTTPS Only:** All API calls must use HTTPS
2. **JWT Tokens:** Admin endpoints require valid JWT
3. **Input Sanitization:** All inputs must be sanitized to prevent XSS/SQL injection
4. **Rate Limiting:** Implement rate limiting on public endpoints
5. **Phone Verification:** Consider OTP verification for form submissions
6. **Logging:** Log all admin actions for audit trail
7. **CORS:** Configure CORS for frontend domain only

---

## Deployment Checklist

- [ ] Set up PostgreSQL database with above schema
- [ ] Configure file storage (S3/Cloud Storage)
- [ ] Set up Redis for caching (optional)
- [ ] Configure webhook endpoints
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy
- [ ] Set up staging environment for testing

---

**Document prepared for:** Patliputra Virtual Showroom Backend Development  
**Contact:** [Your Contact Details]
