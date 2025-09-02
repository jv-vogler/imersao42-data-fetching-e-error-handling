import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import starshipsData from './data/starships.json'

const app = express()
const PORT = 3001
const JWT_SECRET = 'supersecretjwtkey'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Starships API',
      version: '1.0.0',
      description: 'API for Star Wars Starships Top Trumps game',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.ts'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

function simulateRandomFailure(): boolean {
  return Math.random() < 0.33
}

function simulateDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * 900) + 100 // 100-1000ms
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' })
  }

  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' })
  }
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get('/', (_req, res) => {
  res.redirect('/api-docs')
})

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    await simulateDelay()

    const { username, password } = req.body

    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ userId: 'admin', username: 'admin' }, JWT_SECRET, {
        expiresIn: '24h',
      })

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.json({
        token,
        message: 'Login successful',
      })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user information
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 username:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
app.get('/api/auth/me', requireAuth, (req, res) => {
  const token = req.cookies.token
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string }
    res.json({
      userId: decoded.userId,
      username: decoded.username,
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
app.post('/api/auth/logout', requireAuth, (_req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

/**
 * @swagger
 * /api/starships:
 *   get:
 *     summary: Get all starships
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of starships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   model:
 *                     type: string
 *                   starship_class:
 *                     type: string
 *                   speed:
 *                     type: number
 *                   maneuverability:
 *                     type: number
 *                   firepower:
 *                     type: number
 *                   shields:
 *                     type: number
 *                   overall:
 *                     type: number
 *       401:
 *         description: Unauthorized
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */
app.get('/api/starships', async (_req, res) => {
  try {
    await simulateDelay()

    if (simulateRandomFailure()) {
      return res.status(500).json({ error: 'Random server error occurred!' })
    }

    res.json(starshipsData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch starships' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
