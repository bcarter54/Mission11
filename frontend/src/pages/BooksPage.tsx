import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";


function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const navigate = useNavigate();
    return(
        <>
        <button onClick={() => navigate('adminbooks')}>Go to Admin</button>
        <div className="container mt-4">
            <CartSummary />
            <WelcomeBand />
        
        <div className="row">
            <div className="col-md-4 mx-auto">
                <CategoryFilter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    />
            </div>
            <div className="col-md-8">
                <BookList selectedCategories={selectedCategories} 
                />
            </div>
        </div>
        </div>
        </>
    );
}

export default ProjectsPage