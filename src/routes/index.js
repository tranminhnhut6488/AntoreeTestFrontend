import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TeacherDetailPage from "../pages/TeacherDetailPage/TeacherDetailPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchTeacherPage from "../pages/SearchTeacherPage/SearchTeacherPage";
import StudentListCheckPage from "../pages/StudentListCheckPage/StudentListCheckPage";
import TeacherListCheckPage from "../pages/TeacherListCheckPage/TeacherListCheckPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true, 
        isShowFooter: true,      
    },
    {
        path: '/teachers/:id',
        page: TeacherDetailPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/student-list-check',
        page: StudentListCheckPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/teacher-list-check',
        page: TeacherListCheckPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/search',
        page: SearchTeacherPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]