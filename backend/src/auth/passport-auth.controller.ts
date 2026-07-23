import { Controller, Get, Post, UseGuards, Request, Response, Body, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { PassportJwtAuthGuard } from "./guards/passport-jwt.guard";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Public } from "./decorators/public.decorator";
import { PassportRefreshGuard } from "./guards/passport-refresh.guard";

@Controller('auth')
export class PassportAuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    async register(@Body() input: CreateAuthDto) {
        return this.authService.register(input.email, input.password);
    }

    @Public()
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request: any, @Body() createAuth: CreateAuthDto) {
        return this.authService.signIn(request.user);
    }

    @Get("profile")
    @UseGuards(PassportJwtAuthGuard)
    getUserInfo(@Request() request: any) {
        return request.user;
    }

    @Public()
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req: any) {
    }

    @Public()
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req: any, @Response() res: any) {
        const authResult = await this.authService.signIn(req.user);

        const frontendUrl = `${process.env.FRONTEND_URL}/oauth-success?token=${authResult.accessToken}`;

        return res.redirect(frontendUrl);
    }

    @Public()
    @UseGuards(PassportRefreshGuard)
    @Post('refresh')
    async refresh(@Request() req: any) {
        const userId = req.user.id;
        const refreshToken = req.user.refreshToken;
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @UseGuards(PassportJwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: any) {
        return this.authService.logout(req.user.sub || req.user.id);
    }

}