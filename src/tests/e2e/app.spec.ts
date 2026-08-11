import { test, expect } from '@playwright/test';

test('renders bed gaming shell', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('BED GAMING')).toBeVisible();
});
