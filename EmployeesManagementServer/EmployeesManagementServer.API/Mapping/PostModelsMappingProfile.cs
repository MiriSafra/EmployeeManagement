using AutoMapper;
using EmployeesManagementServer.API.Models;
using EmployeesManagementServer.Core.Models;

namespace EmployeesManagementServer.API.Mapping
{
    public class PostModelsMappingProfile:Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<PositionPostModel, Position>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<PositionEmployeePostModel, PositionEmployee>().ReverseMap();

        }

    }
}
