using ChatConnectAPI.Data;
using ChatConnectAPI.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.SignalR;
using ChatConnectAPI.Hubs; // Pentru SignalR

var builder = WebApplication.CreateBuilder(args);

// Add db context
builder.Services.AddDbContext<Entities>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ChatConnect")));

// Add password hasher service
builder.Services.AddSingleton<PasswordHasher<User>>();

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")  // Specifică originea frontend-ului
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();  // Permite credențiale (cookie-uri, tokenuri)
    });
});

// Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };

        // Integrarea autentificării JWT în SignalR
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                // Dacă request-ul este pentru SignalR și include tokenul JWT în query string, îl preia
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chatHub"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

// Add SignalR service
builder.Services.AddSignalR(); // Adaugă SignalR

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Utilizează politica CORS definită mai sus
app.UseCors("CorsPolicy");

// Add authentication and authorization middleware
app.UseAuthentication();  // Adaugă middleware-ul de autentificare (JWT)
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Map SignalR Hubs
app.MapHub<ChatHub>("/chatHub");  // Endpoint pentru SignalR

app.Run();
