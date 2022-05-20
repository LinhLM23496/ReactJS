import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import Staff from './StaffComponent';
import Department from './Department';
import Salary from './SalaryComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { addStaff, fetchStaffs, fetchDepartments, fetchStaffsSalary,
    deleteStaff, updateStaff } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DeparmentList from './DepartmentList';
import StaffDetail from './StaffComponent';
import Hello from './hello';

// export const history = useHistory;

const mapStateToProps = (state) => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary
    };
};

const mapDispatchToProps = (dispatch) => ({
    addStaff: (staff) => { dispatch(addStaff(staff)) },
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchDepartments: () => { dispatch(fetchDepartments()) },
    fetchStaffsSalary: () => { dispatch(fetchStaffsSalary()) },
    deleteStaff: (id) => { dispatch(deleteStaff(id)) },
    updateStaff: (staff) => { dispatch(updateStaff(staff)) },
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchStaffsSalary();
    }
    
    
    render() {
        const StaffWithId = ({ match }) => {
            return (
              <StaffDetail
                staff={ this.props.staffs.staffs
                    .filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]
                }
                dept={this.props.departments.departments}
                onUpdateStaff={this.props.updateStaff}
              />
            );
        };
        
        const StaffWithDept = ({ match }) => {
            return (
                <DeparmentList 
                    dept={
                        this.props.departments.departments.filter(
                            (dept) => dept.id === match.params.deptId
                        )[0]
                    }
                    staff={this.props.staffs.staffs.filter(
                        (staff) => staff.departmentId === match.params.deptId
                    )}
                />
            );
        };
        
        return(
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location.key}
                        classNames='page'
                        timeout={300}
                        >
                        <Switch>
                            <Route path="/staff/:staffId" component={StaffWithId} />
                            <Route path="/departments/:deptId" component={StaffWithDept} />
                            <Route exact path="/staffs" 
                                component={() => (
                                    <StaffList 
                                    staffsLoading={this.props.staffs.isLoading}
                                    onAddStaff={this.props.addStaff}
                                    staffs={this.props.staffs.staffs}
                                    onDeleteStaff={this.props.deleteStaff}
                                    />
                                )} 
                            />
                            <Route path="/departments" component={() => <Department 
                                departments={this.props.departments.departments}  // là mapStateToProps
                                staffs={this.props.staffs.staffs}
                            />} />
                            <Route path="/salary" component={() => <Salary salary={this.props.staffsSalary.staffsSalary} />} />
                            <Redirect to="/staffs" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
                <Hello />
            </div>
        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));