import { TColaborador, TScreen } from "../../models/TColaborador"

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    Switch
} from "@mui/material";

import './css/styles.css'
import './css/form.css'
import './css/select.css'
import { ArrowDownward } from "@mui/icons-material";

type Props = {
    children: TColaborador
    colaborares: TColaborador[]
    setDepartamento: Function
    handleChange: any
    handleChangeStatus: any
    handleSubmit: any
    changeScreen: TScreen
    setChangeScreen: any
    msg: string
}

const FuncionarioForm: React.FC<Props> = ({
    colaborares, children, setDepartamento,
    handleChange, handleChangeStatus, handleSubmit,
    changeScreen, setChangeScreen, msg }: Props) => {

    const photo = "photo_01"

    const styleBtn = {
        maxWidth: "100px",
        backgroundColor: "rgb(38, 202, 74)",
        color: "white",
        padding: "14px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        alignSelf: "flex-end"
    }

    const list_ = <TableContainer component={Paper} className="table">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome <ArrowDownward fontSize="small" /></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Email<ArrowDownward fontSize="small" /></TableCell>
                    <TableCell>Departamento<ArrowDownward fontSize="small" /></TableCell>
                    <TableCell>Status<ArrowDownward fontSize="small" /></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {colaborares.map((c: TColaborador) => (
                    <TableRow key={c.id}>
                        <TableCell>
                            <Avatar
                                src={`img/photos/${photo}.png`}
                                alt={c.nome}
                            />
                        </TableCell>
                        <TableCell>{c.nome}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.departamento}</TableCell>
                        <TableCell>
                            {c.status ? "Ativo" : "Inativo"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

    const btnListColaborador = <button onClick={() => setChangeScreen(1)} className="btn-novo-colaborador">Novo Colaborador</button>
    const btnProx = <button style={styleBtn} onClick={() => setChangeScreen(2)}>Próximo</button>
    const btnConcluir = <button style={styleBtn} onClick={handleSubmit}>Concluir</button>

    const progress =<> <div  className="progress" style={ changeScreen === 1 ? {width:"3%"} : {width:"50%"} }></div><strong>{changeScreen === 1 ? "0%" : "50%"}</strong> </>

    const menu = <div className="menu-container"><a className="menu-link" href="##"  onClick={() => setChangeScreen(0)}>Colaboradores</a>
          <a className="menu-link-of">Cadastrar Colaborador</a></div>


    const form = <>
    <form className="form-container">
        {menu}
        {progress}
        <span className="colaboradores-title">Informações Básicas</span>
            
        <div className="form-group">
            <label>Titulo</label>
            <input
                type="text"
                name="nome"
                onChange={handleChange}
                value={children.nome}
                placeholder="Titulo" required />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                value={children.email}
                placeholder="Email" required />
        </div>
        <div className="form-checkbox">
            <input type="checkbox" name="status" onChange={handleChangeStatus} />
            <label>Ativar ao clicar</label>
        </div>

    </form>
        {btnProx}
        <a href="##" onClick={() => setChangeScreen(0)}>Voltar</a>
    </>

    const selectDepartamento = <div className="select-container">
        {menu}
        {progress}
        <label className="colaboradores-title">Informações Profissionais</label>
        <select className="custom-select" onChange={(e) => setDepartamento(e.target.value)} defaultValue="">
            <option disabled value="">Selecione um Departamento</option>
            <option>Desing</option>
            <option>TI</option>
            <option>Marketing</option>
            <option>Produto</option>
        </select>
        <span className="msg">{msg && msg}</span>
        {btnConcluir}
        <a href="##" onClick={() => setChangeScreen(1)}>Voltar</a>
    </div>

    const list = <> <span className="colaboradores-title">Colaboradores</span><>{btnListColaborador}</>
        <table className="table">
            <thead>
                <tr>
                    <th>Nome<ArrowDownward fontSize="small" /></th>
                    <th></th>
                    <th>Email<ArrowDownward fontSize="small" /></th>
                    <th>Departamento<ArrowDownward fontSize="small" /></th>
                    <th>Status<ArrowDownward fontSize="small" /></th>
                </tr>
            </thead>
            <tbody>
                {colaborares.map((c: TColaborador) => (
                    <tr key={c.id}>
                        <TableCell>
                            <Avatar
                                src={`img/photos/${photo}.png`}
                                alt={c.nome}
                            />
                        </TableCell>
                        <td>{c.nome}</td>
                        <td>{c.email}</td>
                        <td>{c.departamento}</td>
                        <TableCell>
                            <Chip
                                label={c.status ? "Ativo" : "Inativo"}
                                color={c.status ? "success" : "error"}
                                variant="filled"
                                size="small"
                            />
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    </>


    return <>
        <div className="form-container">
            {changeScreen === TScreen.firstScreen && list}
            {changeScreen === TScreen.secondScreen && form}
            {changeScreen === TScreen.EndScreen && selectDepartamento}
        </div>
    </>
}

export { FuncionarioForm }