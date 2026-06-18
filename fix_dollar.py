import re

with open(r'D:\AI\new-api-source-clean\web\default\src\features\pricing\plans.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Replace all ${`$`} with just $ (double dollar bug)
# The pattern is: dollar-sign + backtick-dollar-backtick + close-brace
old_count = content.count('${`$`}')
print(f'Found {old_count} double-dollar occurrences')

content = content.replace('${`$`}', '$')
print(f'Replaced with single $')

# Fix 2: Improve manual transfer note - make it more helpful
old_manual = """{zh
              ? <>{'Please transfer to our company bank account and email the receipt to '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{'. We will credit your account upon confirmation.'}</>
              : <>{'Please transfer to our company bank account and email the receipt to '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{'. We will credit your account upon confirmation.'}</>}"""

new_manual = """{zh
              ? <>{'转账后请将凭证发送至 '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{'，客服确认后为您充值。'}</>
              : <>{'Email receipt to '}<a href='mailto:support@tokenmaster.com'>support@tokenmaster.com</a>{' after transferring. We will credit within 24h.'}</>}"""

if old_manual in content:
    content = content.replace(old_manual, new_manual)
    print('Updated manual transfer note')
else:
    print('WARNING: manual transfer note pattern not found exactly')
    # Try partial search
    if 'Please transfer to our company bank account' in content:
        print('Found old text with different formatting')

with open(r'D:\AI\new-api-source-clean\web\default\src\features\pricing\plans.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
