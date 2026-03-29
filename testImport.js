const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testImport() {
    try {
        const filePath = path.join(__dirname, 'uploads/test-users.xlsx');
        
        if (!fs.existsSync(filePath)) {
            console.error('❌ File test-users.xlsx không tồn tại');
            return;
        }

        console.log('📤 Đang upload file Excel...');
        console.log(`📁 File: ${filePath}\n`);

        // Tạo FormData
        const form = new FormData();
        form.append('excelFile', fs.createReadStream(filePath));

        // Upload lên server
        const response = await fetch('http://localhost:3000/import-users/upload', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const result = await response.json();

        console.log('\n✅ Response từ server:');
        console.log(JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('\n📧 Mailtrap sẽ nhận các email sau:');
            result.data.successList.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.email} - User: ${user.username}`);
            });
            console.log('\n🔗 Kiểm tra Mailtrap Inbox: https://mailtrap.io/inboxes');
        }

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

testImport();
