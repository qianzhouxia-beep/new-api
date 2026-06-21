# TokenMaster 一键修复脚本
# 右键 → "使用 PowerShell 运行"

Write-Host "=== TokenMaster 构建修复 ===" -ForegroundColor Cyan
Set-Location "D:\AI\new-api-source-clean"

# 1. 重置到最后一个能正常构建的版本（纯前端，没有 NOWPayments Go 代码）
Write-Host "[1/2] 重置到稳定版本 efc7d922..." -ForegroundColor Yellow
git reset --hard efc7d922

# 2. 从 3d1ed848 和 f500dc9c 只提取前端文件（不包含 Go 代码）
Write-Host "[2/2] 添加前端修改（`$符号 + PayPal）..." -ForegroundColor Yellow

# 从 3d1ed848 提取前端 wallet 组件修改
git checkout 3d1ed848 -- web/default/src/features/wallet/api.ts
git checkout 3d1ed848 -- web/default/src/features/wallet/hooks/use-payment.ts
git checkout 3d1ed848 -- web/default/src/features/wallet/components/recharge-form-card.tsx
git checkout 3d1ed848 -- web/default/src/features/wallet/components/dialogs/payment-confirm-dialog.tsx

# 从 f500dc9c 提取 PayPal 前端修改
git checkout f500dc9c -- web/default/src/features/wallet/api.ts
git checkout f500dc9c -- web/default/src/features/wallet/hooks/use-payment.ts

# 提交并推送
git add web/default/
git commit -m "fix: 恢复稳定版本 + 前端$符号 + PayPal"
git push origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===================================" -ForegroundColor Green
    Write-Host " 完成！Zeabur 将自动构建部署" -ForegroundColor Green
    Write-Host "===================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "推送失败，请手动执行:" -ForegroundColor Red
    Write-Host "git push origin main --force" -ForegroundColor Yellow
}

pause
