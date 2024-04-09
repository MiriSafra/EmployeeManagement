using AutoMapper;
using EmployeesManagementServer.Core.DTOs;
using EmployeesManagementServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesManagementServer.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<PositionEmployee, PositionEmployeeDto>().ReverseMap();
            CreateMap<EmployeeDto, Employee>().ReverseMap();

        }
    }
} 

