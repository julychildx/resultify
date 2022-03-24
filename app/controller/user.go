package controller

import (
	"net/http"
	"resultify/pkg/auth"
	"resultify/pkg/models"
	"resultify/pkg/utils"

	"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var (
	// errAuthenticationFailure = errors.New("Authentication failed")
	// errorNotFound            = errors.New("Entity not found")
	// errForbidden             = errors.New("Attempted action is not allowed")
	// errUnableToCreateUser    = errors.New("Unable to create User")
	// errUnableToFetchUser     = errors.New("Unable to fetch user")
	// errUnableToFetchUserList = errors.New("Unable to fetch user list")
	// errUnableToUpdateUser    = errors.New("Unable to update user")
	// errUnableToDeleteUser    = errors.New("Unable to delete user")

	// ErrResetExpired occurs when the reset hash exceeds the expiration
	user *UserController
)

// UserController is an anonymous struct for user controller
type UserController struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func (c *UserController) setRoute(r *gin.RouterGroup) {
	// candRouter := r.Group("/user")

	// candRouter.POST("/google", c.google)
	// candRouter.POST("/login", c.login)
	// candRouter.POST("/logout", c.logout)

}

func (c *UserController) register(ctx *fiber.Ctx) error {
	var user models.User

	if err := ctx.BodyParser(&c); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	// Hash Password
	hashedPass, _ := utils.HashPassword(c.Password)
	user.PasswordHash = []byte(hashedPass)

	//Save User To DB
	if err := user.Create(); err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON(Resp{
			Message: "User Not Registered",
			Error:   err.Error(),
		})
	}

	return ctx.Status(http.StatusCreated).JSON(Resp{
		Message: "User Registered",
	})

}

// Login user
func (c *UserController) login(ctx *fiber.Ctx) error {
	if err := ctx.BodyParser(&c); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	var user models.User
	user.Email = c.Email

	// Check if Password is Correct (Hash and Compare DB Hash)
	passwordIsCorrect := utils.CheckPasswordHash(string(user.PasswordHash), c.Password)
	if !passwordIsCorrect {
		return ctx.Status(http.StatusUnauthorized).JSON(Resp{
			Message: "Incorrect Password",
		})
	}

	t, err := auth.IssueAccessToken(user)
	if err != nil {
		return ctx.Status(http.StatusUnauthorized).JSON(err.Error())
	}

	return ctx.Status(http.StatusCreated).JSON(Resp{
		Message: t,
	})
}

// SignUp registers user
func (c *UserController) logout(ctx *fiber.Ctx) error {
	// au, err := auth.ExtractTokenMetadata(ctx.Request())
	// if err != nil {
	// 	return ctx.Status(http.StatusUnauthorized).JSON(err.Error())
	// }

	// deleted, delErr := auth.DeleteAuth(au.AccessUuid)
	// if delErr != nil || deleted == 0 { //if any goes wrong
	// 	return ctx.Status(http.StatusUnauthorized).JSON(err.Error())
	// }

	return ctx.Status(http.StatusOK).JSON("success")
}

func (c *UserController) create(ctx *fiber.Ctx) error {

	var user models.User

	if err := ctx.BodyParser(&c); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	passwordSalt := uuid.New().String()
	saltedPassword := c.Password + passwordSalt
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(saltedPassword), bcrypt.DefaultCost)
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	user.PasswordSalt = passwordSalt
	user.PasswordHash = passwordHash
	user.Email = "user@gmail.com"

	err = user.Create()
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	// if err := z.Mail.Send(); err != nil {
	// 	return ctx.Status(http.StatusBadRequest).JSON(err.Error())
	// }

	return ctx.Status(http.StatusOK).JSON(user)
}

func (c *UserController) getAll(ctx *fiber.Ctx) error {

	route := ctx.Route()

	return ctx.Status(http.StatusOK).JSON(route)
}
