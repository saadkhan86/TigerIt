import Admin from 'firebase-admin'
import serviceAccount from './firebase-service.json'

Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount as Admin.ServiceAccount),
})

export default Admin
