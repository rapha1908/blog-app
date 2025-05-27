"use client";
import { useState, useEffect } from 'react';
import { getCookie } from '../utils/cookies';

export function useUserType() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = getCookie('userType');
    setUserType(type || null);
  }, []);

  return userType;
}