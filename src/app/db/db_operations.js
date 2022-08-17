const pool = require('./db_connect');

function error_handler(error, ctx){
    console.log("ERROR with code " + error.status + ":" + error);
    ctx.body = error;
    throw (error);
}

const getUsers = async ctx => {
    console.log("Selecting all user from table a_user...")
    var result;
    try {
        const client = await pool.connect();
        result = await client.query('SELECT * FROM a_user ORDER BY id ASC');
    } catch (error) {
        error_handler(error,ctx);
        
    }
    
    console.log("Found and returned "+result.rowCount+" user")
    ctx.body = result.rows;
}

const getUserById = async ctx => {
    const id = parseInt(ctx.params.id)
    var result;
    try {
        const client = await pool.connect();
        result = await client.query('SELECT * FROM a_user WHERE id = $1', [id]);
    } catch (error) {
        error_handler(error, ctx);
    }
    if(result.rowCount != 0){
        console.log("Found user with id "+id);
        ctx.body = result.rows[0];
    }
    else{
        console.log("No results found.")
        ctx.body = "No user was found with id "+id;
    }
    
}

const createUser = async ctx => {
    const { name, mail, invest_exp, invest_type } = ctx.request.body
    const pw_sh5 = "PreRegUser";
    var result = -1;
    
    try {
        const client = await pool.connect();
        result = await client.query('INSERT INTO a_user (name_string, mail, pw_sh5, invest_exp, invest_type) VALUES ($1, $2, $3, $4, $5) RETURNING ID', [name, mail, pw_sh5, invest_exp, invest_type]);
    } catch (error) {
        ctx.body = error;
        error_handler(error, ctx)
    }
    id = result.rows[0].id;
    ctx.body = "User created with id "+id;
    
}

const updateUser = async ctx => {
    const id = parseInt(ctx.request.params.id)
    const { name, email } = ctx.request.body

    try {
        const client = await pool.connect();
        await client.query(
            'UPDATE a_user SET name_string = $1, mail = $2 WHERE id = $3',
            [name, email, id]);
    } catch (error) {
        error_handler(error, ctx)
    }
    ctx.body = "Updated user with id "+id+" successfully";
}

const deleteUser = async ctx => {
    const id = parseInt(ctx.request.params.id)
    try {
        const client = await pool.connect();
        await client.query('DELETE FROM a_user WHERE id = $1', [id]);
    } catch (error) {
        error_handler(error);
    }
    ctx.body = "Deleted user with id "+id;
    console.log("Deleted user with id "+id)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}