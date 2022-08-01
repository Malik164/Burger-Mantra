import { render,screen } from "@testing-library/react"
import { BrowserRouter} from "react-router-dom"
import {Sidebar} from "./Sidebar"

describe("<Sidebar/> Componet",()=>{
        beforeEach(()=>{
            render(<Sidebar auth={{token:null}}/>, {wrapper: BrowserRouter})
        })

        test('should render auth link if user is not authenticated',()=>{
            expect(screen.getByRole("link",{
                name:/account/i
            })).toBeInTheDocument()
        })

        test('should render logut link if user is  authenticated and hide account link',async()=>{
            render(<Sidebar auth={{token:'som-token'}} />,{wrapper:BrowserRouter})
            expect(screen.getByRole("link",{
                name:/Sign Out/i
            })).toBeInTheDocument()

        })
})