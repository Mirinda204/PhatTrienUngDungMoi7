const ExcelJS = require('exceljs');
const path = require('path');

async function createTestExcel() {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        // Tạo header
        worksheet.columns = [
            { header: 'username', key: 'username', width: 20 },
            { header: 'email', key: 'email', width: 30 },
            { header: 'fullName', key: 'fullName', width: 25 },
            { header: 'roleId', key: 'roleId', width: 30 }
        ];

        // Thêm dữ liệu test với email thực tế để nhận được trên Mailtrap
        worksheet.addRow({
            username: 'testuser1',
            email: 'test1@example.com',
            fullName: 'Test User 1',
            roleId: ''
        });

        worksheet.addRow({
            username: 'testuser2',
            email: 'test2@example.com',
            fullName: 'Test User 2',
            roleId: ''
        });

        worksheet.addRow({
            username: 'testuser3',
            email: 'test3@example.com',
            fullName: 'Test User 3',
            roleId: ''
        });

        // Format header
        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4472C4' }
        };

        const filePath = path.join(__dirname, 'uploads/test-users.xlsx');
        await workbook.xlsx.writeFile(filePath);
        console.log(`✅ Tạo file Excel test thành công: ${filePath}`);
        console.log('\n📋 Dữ liệu test:');
        console.log('   1. testuser1 - test1@example.com');
        console.log('   2. testuser2 - test2@example.com');
        console.log('   3. testuser3 - test3@example.com');
        console.log('\n📝 Hãy upload file này lên trang import-users để test');

    } catch (error) {
        console.error(`❌ Lỗi: ${error.message}`);
    }
}

createTestExcel();
