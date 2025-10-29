export const generatePatientDrsId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let id = ''
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        id += chars[randomIndex]
    }
    
    return `DRS-${id}`
}
