const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPerfil = async (dados) => {
    const { nome, detalhes, localizacao, experiencia, tags } = await dados;
    //console.log(dados)
    try {
        if (experiencia && Array.isArray(experiencia) && tags && Array.isArray(tags)) {
            const experiencias = await Promise.all(experiencia.map(experienciaData => {
                return prisma.Experiencia.create({
                    data: experienciaData
                });
            }));

            const user = await prisma.UserProfile.create({
                data: {
                    nome: nome,
                    detalhes: detalhes,
                    localizacao: localizacao,
                    experiencia: {
                        connect: experiencias.map(e => ({ id: e.id }))
                    }, tags: {
                        connect: [{ nome: 'Desenvolvedor' }]
                    }
                },
            });

            console.log('Usuário cadastrado com sucesso', user);
        } else {
            console.log('Houve um erro')
        }
    } catch (error) {
        console.error('Erro ao criar', error);
    }
};

module.exports = createPerfil;
