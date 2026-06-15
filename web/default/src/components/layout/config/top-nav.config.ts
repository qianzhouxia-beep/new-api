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
import { type TopNavLink } from '../types'

/**
 * Default top navigation links
 *
 * In practice, navigation links are dynamically fetched from backend.
 * Priority: Backend dynamic links > Provided navLinks > defaultTopNavLinks
 *
 * This is intentionally empty to encourage backend configuration.
 * If you need fallback links, add them here.
 *
 * TokenMaster: Add Pricing link
 */
export const defaultTopNavLinks: TopNavLink[] = [
  {
    title: '首页',
    href: '/',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
  {
    title: '控制台',
    href: '/dashboard',
    disabled: false,
    external: false,
    requiresAuth: true,
  },
  {
    title: '模型广场',
    href: '/models',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
  {
    title: '排行榜',
    href: '/ranking',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
  {
    title: '文档',
    href: '/docs',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
  {
    title: '关于',
    href: '/about',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
  /**
   * TokenMaster: Add Pricing link
   * This links to the pricing page where users can see plans and pay
   */
  {
    title: '价格',
    href: '/pricing',
    disabled: false,
    external: false,
    requiresAuth: false,
  },
]
