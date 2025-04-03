import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    try {
      const decoded = verify(token, JWT_SECRET) as {
        userId: number;
        email: string;
        roles: string[];
      };

      // Call your backend API to get user details
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/${decoded.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return NextResponse.json({ user: null });
      }

      const user = await response.json();
      return NextResponse.json({ user });
    } catch (error) {
      // Token is invalid or expired
      cookies().delete('token');
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null });
  }
} 