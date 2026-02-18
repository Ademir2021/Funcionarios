import { useEffect, useState } from "react"
import { db } from '../../firebase.js'
import { FuncionarioForm } from "../../components/funcionarioForm/FuncionarioForm"
import { TColaborador, TScreen } from "../../models/TColaborador"
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

const Funcionario: React.FC = () => {

    const [changeScreen, setChangeScreen] = useState<TScreen>(TScreen.firstScreen)
    const [status, setStatus] = useState<boolean>(false)
    const [departamento, setDepartamento] = useState<string>("Não definido")
    const [msg, setMsg] = useState<string>("")
    const [colaboradores, setColaboradores] = useState<TColaborador[]>([])
    const [colaborador, setColaborador] = useState<TColaborador>(
        { id: 0, nome: "", email: "", departamento: "", status: false })

    useEffect(() => { colaborador.status = status }, [status])
    useEffect(() => { setColaborador(values => ({ ...values, departamento })) }, [departamento])

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setColaborador(values => ({ ...values, [name]: value }))
    };

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.checked);
    };

    useEffect(() => {
        const q = query(collection(db, "colaboradores"));
        onSnapshot(q, (querySnapshot) => {
            const colaboradoresData: TColaborador[] = [];
            querySnapshot.forEach((doc) => {
                colaboradoresData.push({ id: doc.id, ...doc.data() } as TColaborador);
            });
            setColaboradores(colaboradoresData);
        });
    }, [])

    const inserirColaborador = async (colaborador: TColaborador) => {
        try {
            const docRef = await addDoc(collection(db, "colaboradores"), {
                nome: colaborador.nome,
                email: colaborador.email,
                departamento: colaborador.departamento,
                status: colaborador.status,
            });
            console.log("Documento criado com ID:", docRef.id);

        } catch (error) {
            console.error("Erro ao adicionar colaborador:", error);
        }
    };

    // const addColaborador = (colaborador: TColaborador) => {
    //     setColaboradores([...colaboradores, colaborador])
    //     alert("Colaborador adicionado com sucesso!")
    // }

    const handleSubmit = (e: Event) => {
        e.preventDefault()
        if (colaborador.nome === "" || colaborador.email === "") {
            setMsg("Preencha todos os campos obrigatórios!")
            return
        }
        // addColaborador(colaborador)
        inserirColaborador(colaborador)
        setChangeScreen(TScreen.firstScreen)
    }

    return <>
        {/* <p>{JSON.stringify(colaborador)}</p> */}
        <FuncionarioForm
            colaborares={colaboradores}
            setDepartamento={setDepartamento}
            handleChange={handleChange}
            handleChangeStatus={handleChangeStatus}
            handleSubmit={handleSubmit}
            changeScreen={changeScreen}
            setChangeScreen={setChangeScreen}
            msg={msg}>
            {colaborador}
        </FuncionarioForm>
    </>

}

export { Funcionario }