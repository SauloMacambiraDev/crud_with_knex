const CREATE_TRIGGER = `
CREATE TRIGGER users_before_update
BEFORE UPDATE ON users
FOR EACH ROW SET NEW.updated_at = NOW();
`
const DROP_TRIGGER = `
DROP TRIGGER users_before_update
`

exports.up = async knex => {
    return knex.raw(CREATE_TRIGGER)
            .then(() => console.log('Trigger users_before_update criada com sucesso..'))
            .catch(err => {
                console.log('Não foi possível criar trigger users_before_update. Razão:')
                console.log(err)
            })
}

exports.down = async knex => {
    return knex.raw(DROP_TRIGGER)
    .then(() => console.log('Trigger users_before_update foi removida com sucesso..'))
    .catch(err => {
        console.log('Não foi possível remover trigger users_before_update. Razão:')    
        console.log(err)
    })
}
