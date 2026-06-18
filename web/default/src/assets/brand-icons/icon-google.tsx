/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function IconGoogle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      className={cn(className)}
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <title>Google</title>
      <path strokeWidth='0' d='M0 0h24v24H0z' fill='none' />
      <path d='M20 12.4c0-.6-.1-1.1-.2-1.6h-7.8v3.1h4.5a3.6 3.6 0 0 1-1.6 2.4v2h2.6c1.5-1.4 2.4-3.4 2.5-5.9z' />
      <path d='M12 21c2.2 0 4-.7 5.4-1.9l-2.6-2a4.8 4.8 0 0 1-7.1-2.5H4v2.1A8.6 8.6 0 0 0 12 21z' />
      <path d='M7.8 14.7a5.2 5.2 0 0 1 0-3.4V9.2H4a8.6 8.6 0 0 0 0 7.6l3.8-2.1z' />
      <path d='M12 6.8c1.2 0 2.3.4 3.1 1.2l2.3-2.3A8.5 8.5 0 0 0 4 9.2l3.8 2.1A5 5 0 0 1 12 6.8z' />
    </svg>
  )
}
