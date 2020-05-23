import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAssync = promisify(scrypt)

export class Password {
	static async toHash(password: string) {
		const salt = randomBytes(8).toString('hex')

		const buffer = (await scryptAssync(password, salt, 64)) as Buffer

		return `${buffer.toString('hex')}.${salt}`
	}

	static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.')
    
    const buffer = (await scryptAssync(suppliedPassword, salt, 64)) as Buffer

    return buffer.toString('hex') === hashedPassword
	}
}
