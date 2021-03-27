const express = require('express');
const sql = require('mssql');
const bcryptjs = require('bcryptjs');

const adminRouter = express.Router();
adminRouter.get('/', async (req, res) => {
    try {
        const result = await new sql.Request().query(`select * from [Customer]`);
        res.json({
            listUser: result.recordset
        })
    } catch (err) {
        console.log('err', err);
    }
})
adminRouter.post('/count', async (req, res) => {
    console.log('req', req.body);
    try {
        const result = await new sql.Request().query(`
            SELECT COUNT(*) AS NumberOfProducts, SUM(Sold) AS Sold
            FROM [Product]
            SELECT COUNT(*) AS NumberOfCustomers
            FROM [Customer]
            SELECT COUNT(*) AS NumberOfOrders, SUM(Total) AS Total
            FROM [Order]
        `);
        console.log('result', result);
        res.status(201).json({
            success: true,
            products: result.recordsets[0][0].NumberOfProducts,
            sold: result.recordsets[0][0].Sold,
            users: result.recordsets[1][0].NumberOfCustomers,
            orders: result.recordsets[2][0].NumberOfOrders,
            total: result.recordsets[2][0].Total
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

adminRouter.get('/recent-orders', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
            SELECT TOP 5 * FROM [Order]
            ORDER BY CreateDate DESC
        `);
        res.status(201).json({
            success: true,
            recordset: result.recordset
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
adminRouter.get('/user-list', async (req, res) => {
    try {
        const result = await new sql.Request().query(`
        select Username as username, [Name] as [name], [Address] as [address], 
[Phone] as [phone], [Permission] as [permission], [TotalPayment] as [TotalPayment]  from [Customer] where Permission !=0002`);
        res.status(201).json({
            success: true,
            listUser: result.recordset
        })
    } catch {
        (err) => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
})
adminRouter.post('/update-user', async (req, res) => {
    console.log('req', req.body.username);
    const hashPassword = bcryptjs.hashSync(req.body.password, 10);
    try {
        await new sql.Request().query(`
        UPDATE [Customer] set Password='${hashPassword}',
        Name='${req.body.name}',
        Address='${req.body.address}',
        Phone='${req.body.phone}'
        WHERE [Username] = '${req.body.username}'`).then(async (data) => {
            console.log('data', data);
            res.json({
                message: "ok",
            })
        }).catch(err => {
            console.log('err', err);
        });
    } catch (err) {
        console.log('err', err);
    }
})
adminRouter.post('/delete', async (req, res) => {
    console.log('req', req.body);
    try {
        await new sql.Request().query(`DELETE from [Customer]
        where Username='${req.body.username}'`).then(data => {
            res.json({ message: "ok" })
        })
    } catch (error) {
        console.log('err', error);
    }
})
adminRouter.post('/createCustomer', async (req, res) => {
    console.log('req.body', req.body);
    try {
        await new sql.Request().query(`select * from [Customer] where Username='${req.body.username}'`)
            .then(async (data) => {
                if (!data.rowsAffected[0]) {
                    const hashPassword = bcryptjs.hashSync(req.body.password, 10);
                    const regQuery = `
                    INSERT INTO Customer
                    VALUES (
                        '${req.body.username}',
                        '${hashPassword}',
                        N'${req.body.name}',
                        N'${req.body.address}',
                        '${req.body.phone}',
                        '${req.body.permission}'
                    )
                    `;
                    const regResult = await new sql.Request().query(regQuery);
                    console.log('reqResult', regResult);
                    res.json({
                        message: "Create Successfull."
                    })
                }
                else {
                    res.json({
                        message: "This username have exists in database."
                    })
                }
            })
    } catch (err) {
        console.log('err', err);
    }
});
adminRouter.post('/userPayment', async (req, res) => {
    try {
        await new sql.Request().query(`select Total,Customer.Username  from Customer join [Order] 
        on(Customer.Username = [Order].Username)`).then(data => {
            co
        })
    } catch (err) {
        console.log('err', err);
    }

})
adminRouter.get('/revenue', async (req, res) => {
    try {
        const productRevenue = await new sql.Request().query('select (Sold*Price) as value, Name from Product')
        const allRevenue = await new sql.Request().query('select SUM(Sold*Price)as valueSum from Product')
        res.json({
            data: productRevenue.recordset,
            allRevenue: allRevenue.recordset[0].valueSum
        })
    } catch (err) {
        res.json({
            message: err
        })
    }
})
module.exports = adminRouter;