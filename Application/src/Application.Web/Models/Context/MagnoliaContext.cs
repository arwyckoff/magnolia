﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Magnolia.Context.Models
{
    public class MagnoliaContext : IdentityDbContext
    {
        public DbSet<Characteristic> Characteristics { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Genus> Genus { get; set; }
        public DbSet<GenusCharacteristics> GenusCharacteristics { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<PlantCharacteristics> PlantCharacteristics { get; set; }
        public DbSet<UserPlants> UserPlants { get; set; }
        public DbSet<CharacteristicCategory> CharacteristicCategories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionAnswer> QuestionAnswers { get; set; }
        public DbSet<QuestionAnswersStates> QuestionAnswersStates { get; set; }

        public MagnoliaContext() : base()
        {

        }

        public MagnoliaContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlite("Filename=./magnolia.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .ForSqliteToTable("Roles");

            builder.Entity<IdentityUserRole<string>>()
                .ForSqliteToTable("UserRoles");

            builder.Entity<IdentityUserClaim<string>>()
                .ForSqliteToTable("UserClaims");

            builder.Entity<IdentityUserLogin<string>>()
                .ForSqliteToTable("UserLogins");

            builder.Entity<IdentityUserToken<string>>()
                .ForSqliteToTable("UserTokens");

            builder.Entity<IdentityRoleClaim<string>>()
                .ForSqliteToTable("RoleClaims");

            builder.Entity<IdentityUser>()
                .ForSqliteToTable("Users");
        }
    }
}
