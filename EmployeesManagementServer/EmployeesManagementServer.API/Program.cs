using EmployeesManagementServer.API.Mapping;
using EmployeesManagementServer.Core;
using EmployeesManagementServer.Core.Repositories;
using EmployeesManagementServer.Core.Services;
using EmployeesManagementServer.Data;
using EmployeesManagementServer.Data.Repositories;
using EmployeesManagementServer.Service.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("Emp");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("Emp"), ServerVersion.Parse("8.0.36-mysql")),
    ServiceLifetime.Singleton);

var policy = "policy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policy, policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IPositionRepository, PositionRepository>();
builder.Services.AddScoped<IPositionEmployeeRepository, PositionEmployeeRepository>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IPositionEmployeeService, PositionEmployeeService>();
builder.Services.AddAutoMapper(typeof(PostModelsMappingProfile), typeof(MappingProfile));
//builder.Services.AddDbContext<DataContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthorization();
app.UseCors(policy);


app.MapControllers();

app.Run();
