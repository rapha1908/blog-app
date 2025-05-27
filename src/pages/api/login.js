export default async function handle(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, senha } = req.body;
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            const data = await response.json();
            if (response.ok) {
                res.status(200).json({ message: 'Login feito com sucesso', data });
            } else {
                res.status(response.status).json({ message: 'Falha no login', error: data });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao conectar na API', error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: `Método ${req.method} não permitido` });
    }
}