/**
 * Analytics Tracking Endpoint
 * 
 * Handles client-side analytics tracking requests from redirect pages
 */

import { NextRequest, NextResponse } from 'next/server';
import { logAnalyticsEvent } from '@/lib/analytics-service';
import type { AnalyticsEvent } from '@/lib/analytics-types';

/**
 * POST /api/analytics/track
 * 
 * Processes analytics tracking requests from client-side
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the analytics event from request body
    // Handle both JSON and sendBeacon (text/plain) requests
    let analyticsEvent: AnalyticsEvent;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      analyticsEvent = await request.json();
    } else {
      // Handle sendBeacon requests (sent as text/plain)
      const textBody = await request.text();
      analyticsEvent = JSON.parse(textBody);
    }
    
    // Validate required fields
    if (!analyticsEvent.event_type || !analyticsEvent.request_id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required analytics fields'
        },
        { status: 400 }
      );
    }
    
    // Log the analytics event
    await logAnalyticsEvent(analyticsEvent);
    
    return NextResponse.json({
      success: true
    });
    
  } catch (error) {
    console.error('Analytics tracking endpoint error:', error);
    
    // Still return success to avoid client-side errors affecting UX
    return NextResponse.json({
      success: true, // Return success even on error to not block redirects
      error: 'Internal server error'
    });
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed'
    },
    { 
      status: 405,
      headers: {
        'Allow': 'POST'
      }
    }
  );
}

export async function PUT(): Promise<NextResponse> {
  return GET();
}

export async function DELETE(): Promise<NextResponse> {
  return GET();
}

export async function PATCH(): Promise<NextResponse> {
  return GET();
}