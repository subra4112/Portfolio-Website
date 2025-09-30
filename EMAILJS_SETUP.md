# EmailJS Setup Guide

## Quick Setup Steps

1. **Go to [EmailJS.com](https://www.emailjs.com)** and create a free account

2. **Create an Email Service:**
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail recommended)
   - Connect your Gmail account (rvanush3@gmail.com)
   - Note down the **Service ID** (will be like `service_xxxxxxx`)

3. **Create an Email Template:**
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Use this template content:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

   - Note down the **Template ID** (will be like `template_xxxxxxx`)

4. **Get Your Public Key:**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update the Contact Component:**
   - Open `src/components/Contact.tsx`
   - Replace these values in the `handleSubmit` function:
     - `serviceId`: Your service ID from step 2
     - `templateId`: Your template ID from step 3
     - `publicKey`: Your public key from step 4

## Example Configuration

```javascript
const serviceId = 'service_portfolio123'
const templateId = 'template_contact456'
const publicKey = 'your_public_key_here'
```

## Benefits of EmailJS

- ✅ **Free tier**: 200 emails/month
- ✅ **No backend required**: Works directly from frontend
- ✅ **Reliable delivery**: Professional email service
- ✅ **Spam protection**: Built-in anti-spam measures
- ✅ **Easy setup**: 5-minute configuration

## Alternative: Formspree (If you prefer)

If you want an even simpler setup, you can use Formspree:

1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form
4. Get your form endpoint
5. Update the form action to use their endpoint

Both services are reliable and free for personal portfolios!
