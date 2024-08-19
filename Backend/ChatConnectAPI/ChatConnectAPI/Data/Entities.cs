using Microsoft.EntityFrameworkCore;
using ChatConnectAPI.Domain.Entities;
using System;

namespace ChatConnectAPI.Data
{
    public class Entities : DbContext
    {
        public DbSet<User> Users => Set<User>();

        public Entities(DbContextOptions<Entities> options) : base(options)
        {
            /*empty*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.username);
        }
    }
}
